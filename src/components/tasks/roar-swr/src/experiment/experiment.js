/* eslint-disable no-param-reassign */
import store from 'store2';
import {
  generateAssetObject,
  createPreloadTrials,
  ValidityEvaluator,
  createEvaluateValidity,
} from '@bdelab/roar-utils';
import { Cat } from '@bdelab/jscat';
import i18next from 'i18next';

// setup
import { initRoarJsPsych, initRoarTimeline } from './config/config';
import assets from '../../webpAssets.json';
import { jsPsych } from './jsPsych';

// trials
import { audioResponse } from './trials/audioFeedback';
import { introductionTrials, postPracticeIntro } from './trials/introduction';
import { practiceFeedback } from './trials/practiceFeedback';
import { midBlockPageList, postBlockPageList, finalPage } from './trials/gameBreak';
import { ifNotFullscreen, exitFullscreen } from './trials/fullScreen';
import { setupFixationTest, setupFixationPractice } from './trials/setupFixation';
import { lexicalityTest, lexicalityPractice } from './trials/stimulus';
import { countdownTrials } from './trials/countdown';
import { ifCoinTracking } from './trials/coinFeedback';

const bucketURI = 'https://storage.googleapis.com/roar-swr';

// eslint-disable-next-line import/no-mutable-exports
export let cat;
// eslint-disable-next-line import/no-mutable-exports
export let cat2;

// eslint-disable-next-line import/no-mutable-exports
export const presentationTimeCats = {};

// eslint-disable-next-line import/no-mutable-exports
// export let mediaAssets;

export let mediaAssets = {
  audio: {
    coinIntro: '@/assets/en/desktop/coin_intro.mp3',
    endBlock1: '@/assets/en/desktop/end_block_1.mp3',
    endBlock1Ns: '@/assets/en/desktop/end_block_1_ns.mp3',
    endBlock2: '@/assets/en/desktop/end_block_2.mp3',
    endBlock2Ns: '@/assets/en/desktop/end_block_2_ns.mp3',
    endGame: '@/assets/en/desktop/end_game.mp3',
    endGameNs: '@/assets/en/desktop/end_game_ns.mp3',
    endBlockGeneralNs: '@/assets/en/desktop/end_block_general_ns.mp3',
    feedback1Correct: '@/assets/en/desktop/feedback_1_correct.mp3',
    feedback1CorrectNs: '@/assets/en/desktop/feedback_1_correct_ns.mp3',
    feedback1Wrong: '@/assets/en/desktop/feedback_1_wrong.mp3',
    feedback1WrongNs: '@/assets/en/desktop/feedback_1_wrong_ns.mp3',
    feedback2Correct: '@/assets/en/desktop/feedback_2_correct.mp3',
    feedback2CorrectNs: '@/assets/en/desktop/feedback_2_correct_ns.mp3',
    feedback2Wrong: '@/assets/en/desktop/feedback_2_wrong.mp3',
    feedback2WrongNs: '@/assets/en/desktop/feedback_2_wrong_ns.mp3',
    feedback3Correct: '@/assets/en/desktop/feedback_3_correct.mp3',
    feedback3CorrectNs: '@/assets/en/desktop/feedback_3_correct_ns.mp3',
    feedback3Wrong: '@/assets/en/desktop/feedback_3_wrong.mp3',
    feedback3WrongNs: '@/assets/en/desktop/feedback_3_wrong_ns.mp3',
    feedback4Correct: '@/assets/en/desktop/feedback_4_correct.mp3',
    feedback4CorrectNs: '@/assets/en/desktop/feedback_4_correct_ns.mp3',
    feedback4Wrong: '@/assets/en/desktop/feedback_4_wrong.mp3',
    feedback4WrongNs: '@/assets/en/desktop/feedback_4_wrong_ns.mp3',
    feedback5Correct: '@/assets/en/desktop/feedback_5_correct.mp3',
    feedback5CorrectNs: '@/assets/en/desktop/feedback_5_correct_ns.mp3',
    feedback5Wrong: '@/assets/en/desktop/feedback_5_wrong.mp3',
    feedback5WrongNs: '@/assets/en/desktop/feedback_5_wrong_ns.mp3',
    intro1: '@/assets/en/desktop/intro_1.mp3',
    intro1Ns: '@/assets/en/desktop/intro_1_ns.mp3',
    intro2: '@/assets/en/desktop/intro_2.mp3',
    intro2Ns: '@/assets/en/desktop/intro_2_ns.mp3',
    intro3: '@/assets/en/desktop/intro_3.mp3',
    intro3Ns: '@/assets/en/desktop/intro_3_ns.mp3',
    midBlock1: '@/assets/en/desktop/mid_block_1.mp3',
    midBlock1Ns: '@/assets/en/desktop/mid_block_1_ns.mp3',
    midBlock2: '@/assets/en/desktop/mid_block_2.mp3',
    midBlock2Ns: '@/assets/en/desktop/mid_block_2_ns.mp3',
    midBlock3: '@/assets/en/desktop/mid_block_3.mp3',
    midBlock3Ns: '@/assets/en/desktop/mid_block_3_ns.mp3',
    postPracticeNs: '@/assets/en/desktop/post_practice_ns.mp3',
    beep: '@/assets/shared/beep.mp3',
    coin: '@/assets/shared/coin.mp3',
    countdown0: '@/assets/shared/countdown0.mp3',
    countdown1: '@/assets/shared/countdown1.mp3',
    countdown2: '@/assets/shared/countdown2.mp3',
    countdown3: '@/assets/shared/countdown3.mp3',
    fail: '@/assets/shared/fail.mp3',
    fairyCoin: '@/assets/shared/fairyCoin.mp3',
    select: '@/assets/shared/select.mp3',
  },
  images: {
    arrowLeftP2: '@/assets/en/shared/arrow_left_p2.webp',
    arrowP3: '@/assets/en/shared/arrow_p3.webp',
    arrowRightP2: '@/assets/en/shared/arrow_right_p2.webp',
    break: '@/assets/shared/break.webp',
    adventurer1: '@/assets/shared/adventurer1.webp',
    adventurer2: '@/assets/shared/adventurer2.webp',
    adventurer3: '@/assets/shared/adventurer3.webp',
    animatedLeftKey: '@/assets/shared/animated_left_key.webp',
    animatedRightKey: '@/assets/shared/animated_right_key.webp',
    arrowP2: '@/assets/shared/arrow_p2.webp',
    arrowkeyLex: '@/assets/shared/arrowkey_lex.webp',
    arrowkeyLexLeft: '@/assets/shared/arrowkey_lex_left.webp',
    arrowkeyLexRight: '@/assets/shared/arrowkey_lex_right.webp',
    coinBag: '@/assets/shared/coin_bag.webp',
    coinBagOld: '@/assets/shared/coin_bag_old.webp',
    coinIcon: '@/assets/shared/coin_icon.webp',
    ending: '@/assets/shared/ending.webp',
    endingBackground: '@/assets/shared/ending_background.webp',
    endingCoinbag: '@/assets/shared/ending_coinbag.webp',
    endingGate: '@/assets/shared/ending_gate.webp',
    endingGateCoinbag: '@/assets/shared/ending_gate_coinbag.webp',
    gateClose: '@/assets/shared/gate_close.webp',
    gateOpen: '@/assets/shared/gate_open.webp',
    goldCoin: '@/assets/shared/gold_coin.webp',
    guardian1: '@/assets/shared/guardian1.webp',
    guardian2: '@/assets/shared/guardian2.webp',
    guardian3: '@/assets/shared/guardian3.webp',
    halfValley: '@/assets/shared/half_valley.webp',
    rewardAnim: '@/assets/shared/reward_anim.webp',
    staticCenterKey: '@/assets/shared/static_center_key.webp',
    staticLeftKey: '@/assets/shared/static_left_key.webp',
    staticRightKey: '@/assets/shared/static_right_key.webp',
    swrLaptop: '@/assets/shared/swr_laptop.webp',
    valley: '@/assets/shared/valley.webp',
    valley2: '@/assets/shared/valley2.webp',
    valley3: '@/assets/shared/valley3.webp',
    valley4: '@/assets/shared/valley4.webp',
    valley5: '@/assets/shared/valley5.webp',
    wizardCoin: '@/assets/shared/wizard_coin.webp',
    wizardIdle: '@/assets/shared/wizard_idle.webp',
    wizardMagic: '@/assets/shared/wizard_magic.webp',
  },
  video: {},
};
// eslint-disable-next-line import/no-mutable-exports
export let preloadTrials;

// eslint-disable-next-line import/no-mutable-exports
export let swrValidityEvaluator;

export function buildExperiment(firekit, config) {
  let someMediaAssets = generateAssetObject(assets, bucketURI, i18next.language);
  console.log(someMediaAssets)
  console.log('assets', assets);
  console.log('mediaassets', mediaAssets);
  preloadTrials = createPreloadTrials(assets, bucketURI, i18next.language).default;
  console.log("preload trials", preloadTrials)
  preloadTrials.message = i18next.t('loading');

  // Initialize jsPsych and timeline
  initRoarJsPsych(config);
  const initialTimeline = initRoarTimeline(firekit);

  cat = new Cat({
    method: 'MLE',
    minTheta: -6,
    maxTheta: 6,
    itemSelect: store.session('itemSelect'),
  });

  // Include new items in thetaEstimate
  cat2 = new Cat({
    method: 'MLE',
    minTheta: -6,
    maxTheta: 6,
    itemSelect: store.session('itemSelect'),
  });

  const presentationTimeOption = store.session.get('presentationTimeOption');
  for (let i = 0; i < presentationTimeOption.length; i += 1) {
    const kitten = new Cat({
      method: 'MLE',
      minTheta: -6,
      maxTheta: 6,
      itemSelect: store.session('itemSelect'),
    });
    presentationTimeCats[store.session.get('presentationTimeOption')[i]] = kitten;
  }

  const timeline = [preloadTrials, ...initialTimeline, introductionTrials, ifNotFullscreen, countdownTrials];

  // the core procedure
  const pushPracticeTotimeline = (array) => {
    array.forEach((element) => {
      const block = {
        timeline: [setupFixationPractice, lexicalityPractice, audioResponse, practiceFeedback],
        timeline_variables: [element],
      };
      timeline.push(block);
    });
  };

  const blockPracticeTrials = store.session('corpusPractice').slice(0, config.totalTrialsPractice);

  pushPracticeTotimeline(blockPracticeTrials);
  timeline.push(postPracticeIntro);
  timeline.push(ifNotFullscreen);

  const coreProcedure = {
    timeline: [setupFixationTest, lexicalityTest, audioResponse, ifCoinTracking],
  };

  const pushTrialsTotimeline = (userMode, stimulusCounts) => {
    const presentationExperimentsModes = ['presentationExp', 'presentationExpShort', 'presentationExp2Conditions'];

    const determineRepetitions = (number) => {
      if (number % 2 === 0) {
        return [number / 2, number / 2];
      }
      return [Math.floor(number / 2) + 1, Math.floor(number / 2)];
    };

    for (let i = 0; i < stimulusCounts.length; i += 1) {
      // for each block: add trials
      /* add first half of block */
      const countTrials = determineRepetitions(stimulusCounts[i]);
      const roarMainProcBlock1 = {
        timeline: [coreProcedure],
        conditional_function: () => {
          if (stimulusCounts[i] === 0) {
            return false;
          }
          store.session.set('currentBlockIndex', i);
          return true;
        },
        repetitions: countTrials[0],
      };
      /* add second half of block */
      const roarMainProcBlock2 = {
        timeline: [coreProcedure],
        conditional_function: () => stimulusCounts[i] !== 0,
        repetitions: countTrials[1],
      };

      const roarMainProcBlockGeneral = {
        timeline: [coreProcedure],
        conditional_function: () => {
          if (stimulusCounts[i] === 0) {
            return false;
          }
          store.session.set('currentBlockIndex', i);
          return true;
        },
        repetitions: stimulusCounts[i],
      };

      if (!presentationExperimentsModes.includes(userMode)) {
        // normal swr assessment
        const totalMainProc = {
          timeline: [
            countdownTrials,
            roarMainProcBlock1,
            midBlockPageList[0],
            ifNotFullscreen,
            countdownTrials,
            roarMainProcBlock2,
          ],
        };
        timeline.push(totalMainProc);
        if (i < stimulusCounts.length - 1) {
          timeline.push(postBlockPageList[i]);
          timeline.push(ifNotFullscreen);
        }
      } else {
        // presentation experiment
        const totalMainProc = {
          timeline: [countdownTrials, roarMainProcBlockGeneral],
        };
        timeline.push(totalMainProc);
        if (i < stimulusCounts.length - 1) {
          timeline.push(postBlockPageList[2]);
          timeline.push(ifNotFullscreen);
        }
      }
    }
  };

  pushTrialsTotimeline(config.userMode, config.stimulusCountList);
  timeline.push(finalPage, exitFullscreen);

  const swrEvaluateValidity = createEvaluateValidity({
    responseTimeLowThreshold: 400,
    minResponsesRequired: 40,
    includedReliabilityFlags: ['responseTimeTooFast'],
  });

  const swrHandleEngagementFlags = (flags, reliable) => {
    if (config.firekit.run.started) {
      return config.firekit?.updateEngagementFlags(flags, reliable);
    }
    return null;
  };

  swrValidityEvaluator = new ValidityEvaluator({
    evaluateValidity: swrEvaluateValidity,
    handleEngagementFlags: swrHandleEngagementFlags,
  });

  return { jsPsych, timeline };
}
