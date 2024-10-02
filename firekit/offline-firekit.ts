import { RoarFirekit } from "./firekit";
import { getTaskAndVariant } from "./firestore/query-assessment";
import { doc, runTransaction } from "firebase/firestore";
import { Assessment, AssignedAssessment, UserType } from "./interfaces";
import { UserInfo, UserInput } from "./firestore/app/user";
import { OfflineAppKit } from "./firestore/app/offline-appkit";
import { taskParameters } from "../src/components/tasks/parameters";

export class OfflineFirekit extends RoarFirekit {
  // takes in a username (or null) and returns a ROARAppUseusername (or null). If null, returns auto generated user
  /**
   *
   * @param studentUsername
   */
  async createNewParticipant(studentUsername: string) {}

  /**
   this function would take in a new parameter, "participant" as the user that is currently
  taking the assessment but not authenticated in
   * 
   * @param administrationId 
   * @param taskId 
   * @param taskVersion 
   * @param participant 
   * @returns 
   */
  async startAssessmentForTargetParticipant(
    administrationId: string,
    taskId: string,
    taskVersion: string,
    participant: string
  ) {
    this._verifyAuthentication();
    //   const targetParticipantUserInfo:UserInfo = {
    //     roarUid: "ctt3TIYA7kQN6BGs97fMTWg7ZAk2",
    //     assessmentUid: "5ZU8afI7lVYV29P58EQe18UdmDC2",
    //     assessmentPid: "OTG-c71fccea",
    //     userType: UserType.student,
    // }

    const appKit = await runTransaction(this.admin!.db, async (transaction) => {
      // First grab data about the administration
      const administrationDocRef = doc(
        this.admin!.db,
        "administrations",
        administrationId
      );
      const administrationDocSnap = await transaction.get(administrationDocRef);
      if (administrationDocSnap.exists()) {
        let assessmentParams: { [x: string]: unknown } = {};
        if (taskParameters[taskId] === undefined) {
          throw new Error(
            `Could not find assessment with taskId ${taskId} in taskParameters dictionary`
          );
        } else {
          assessmentParams = taskParameters[taskId].variant;
        }

        // Check the assignment to see if none of the assessments have been
        // started yet. If not, start the assignment
        const assignmentDocRef = doc(
          this.dbRefs!.admin.assignments,
          administrationId
        );
        const assignmentDocSnap = await transaction.get(assignmentDocRef);
        if (assignmentDocSnap.exists()) {
          const assignedAssessments = assignmentDocSnap.data()
            .assessments as AssignedAssessment[];
          const assessmentUpdateData = {
            startedOn: new Date(),
          };

          // Append runId to `allRunIds` for this assessment
          // in the userId/assignments collection
          await this._updateAssignedAssessment(
            administrationId,
            taskId,
            assessmentUpdateData,
            transaction
          );

          if (
            !assignedAssessments.some((a: AssignedAssessment) =>
              Boolean(a.startedOn)
            )
          ) {
            await this.startAssignment(administrationId, transaction);
          }

          if (this.roarAppUserInfo === undefined) {
            await this.getMyData();
          }

          const tempAssigningOrgs = {
            schools: [],
            classes: [],
            districts: [],
            groups: ["rfhfUU0qKyPKKQewfVd4"],
            families: [],
          };
          const tempReadOrgs = {
            schools: [],
            classes: [],
            districts: [],
            groups: ["rfhfUU0qKyPKKQewfVd4"],
            families: [],
          };

          const assigningOrgs = assignmentDocSnap.data().assigningOrgs;
          const readOrgs = assignmentDocSnap.data().readOrgs;
          console.log("levantetaskid", taskId);
          // TODO: Pull task and variant info from parameters

          const taskAndVariantFromBackend = await getTaskAndVariant({
            db: this.app!.db,
            taskId,
            variantParams: assessmentParams,
          });
          // if (taskAndVariant.task === undefined) {
          //   throw new Error(`Could not find task ${taskId}`);
          // }

          // if (taskAndVariant.variant === undefined) {
          //   throw new Error(
          //     `Could not find a variant of task ${taskId} with the params: ${JSON.stringify(assessmentParams)}`,
          //   );
          // }
          const taskAndVariant = taskParameters[taskId];
          console.log(
            "taskaAndvariant",
            taskAndVariant,
            taskAndVariantFromBackend
          );
          if (taskAndVariant.task === undefined) {
            throw new Error(`Could not find task ${taskId}`);
          }

          if (taskAndVariant.variant === undefined) {
            throw new Error(`Variant of task ${taskId} not found}`);
          }

          const taskName = taskAndVariant.task.name;
          const taskDescription = taskAndVariant.task.description;
          const variantName = taskAndVariant.variant.name;
          const variantDescription = taskAndVariant.variant.description;

          const { testData: isAssignmentTest, demoData: isAssignmentDemo } =
            assignmentDocSnap.data();
          const { testData: isUserTest, demoData: isUserDemo } =
            this.roarAppUserInfo!;
          const { testData: isTaskTest, demoData: isTaskDemo } =
            taskAndVariant.task;
          const { testData: isVariantTest, demoData: isVariantDemo } =
            taskAndVariant.variant;

          const taskInfo = {
            db: this.app!.db,
            taskId,
            taskName,
            taskDescription,
            taskVersion,
            variantName,
            variantDescription,
            variantParams: taskAndVariant.variant,
            testData: {
              task: isTaskTest ?? false,
              variant: isVariantTest ?? false,
            },
            demoData: {
              task: isTaskDemo ?? false,
              variant: isVariantDemo ?? false,
            },
          };

          /// todo: figure out which params can be obviated for the offline flavor
          return new OfflineAppKit({
            firebaseProject: this.app,
            userInfo: this.roarAppUserInfo,
            targetUser: participant,
            assigningOrgs,
            readOrgs,
            assignmentId: administrationId,
            taskInfo,
            testData: {
              user: isUserTest,
              task: isTaskTest,
              variant: isVariantTest,
              run:
                isAssignmentTest || isUserTest || isTaskTest || isVariantTest,
            },
            demoData: {
              user: isUserDemo,
              task: isTaskDemo,
              variant: isVariantDemo,
              run:
                isAssignmentDemo || isUserDemo || isTaskDemo || isVariantDemo,
            },
            // return the ref of the admin user
            // parentUserRef: this.roarUid,
          });
        } else {
          throw new Error(
            `Could not find assignment for user ${this.roarUid} with administration id ${administrationId}`
          );
        }
      } else {
        throw new Error(
          `Could not find administration with id ${administrationId}`
        );
      }
    });

    return appKit;
  }
}
