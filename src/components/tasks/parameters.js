export const taskParameters = {
  // params for route core-tasks/vocab
  // This is what's coming back from `getTask`
  //   {
  //     "task": {
  //         "name": "ROAR - Picture Vocabulary",
  //         "image": "https://raw.githubusercontent.com/yeatmanlab/roar-assets/main/roar-apps/picture-vocab-no-lion.png",
  //         "studentFacingName": "Picture Vocab",
  //         "id": "vocab",
  //         "description": "Listen to words and find the matching picture",
  //         "gameConfig": {
  //             "recruitment": "pilot",
  //             "audioFeedback": "binary",
  //             "randomCatchIndex": 103,
  //             "skipInstructions": true,
  //             "nRandom": 5,
  //             "story": false,
  //             "totalTrialsPractice": 5,
  //             "stimulusCountList": "103",
  //             "userMode": "4AFC",
  //             "numTrialsTotal": 103,
  //             "consent": true
  //         },
  //         "publicName": "ROAR - Picture Vocab",
  //         "lastUpdated": {
  //             "seconds": 1727465761,
  //             "nanoseconds": 506000000
  //         },
  //         "registered": true,
  //         "technicalName": "Picture Vocabulary"
  //     },
  //     "variant": {
  //         "lastUpdated": {
  //             "seconds": 1727289506,
  //             "nanoseconds": 40000000
  //         },
  //         "name": "vocab-school-4AFC-5minTimer",
  //         "params": {
  //             "audioFeedback": "binary",
  //             "userMode": "4AFC",
  //             "skipInstructions": true,
  //             "maxTime": 5,
  //             "consent": true,
  //             "numTrialsTotal": 48,
  //             "story": true,
  //             "recruitment": "school"
  //         },
  //         "id": "OsF6wag4pQiEqNHdvM5u"
  //     }
  // }
  swr: {
    task: {
      publicName: "ROAR - Word",
      image:
        "https://raw.githubusercontent.com/yeatmanlab/roar-assets/main/roar-apps/word-no-lion.png",
      description:
        "Words will flash quickly on the screen. Decide if they are real or made up.",
      lastUpdated: {
        seconds: 1727457612,
        nanoseconds: 676000000,
      },
      name: "ROAR - Word",
      id: "swr",
      studentFacingName: "Word",
      technicalName: "Single Word Recognition (SWR)",
      tutorialVideo:
        "https://storage.googleapis.com/roar-swr/en/shared/ROAR-SWR%20instructional%20video.mp4",
      gameConfig: {
        recruitment: "pilot",
        totalTrialsPractice: 5,
        nRandom: 5,
        addNoResponse: false,
        countSlowPractice: 2,
        skipInstructions: true,
        consent: true,
      },
      registered: true,
    },
    variant: {
      lastUpdated: {
        seconds: 1726698728,
        nanoseconds: 612000000,
      },
      registered: true,
      name: "word-school-shortAdaptive-nostory",
      params: {
        audioFeedbackOption: "binary",
        numAdaptive: 84,
        storyOption: "grade-based",
        addNoResponse: false,
        numValidated: 84,
        numNew: 0,
        userMode: "shortAdaptive",
        recruitment: "school",
        consent: true,
        skipInstructions: true,
      },
      id: "1KZ9rzyX62NIZevN8LqK",
    },
  },
  vocab: {
    task: {
      name: "ROAR - Picture Vocabulary",
      image:
        "https://raw.githubusercontent.com/yeatmanlab/roar-assets/main/roar-apps/picture-vocab-no-lion.png",
      studentFacingName: "Picture Vocab",
      id: "vocab",
      description: "Listen to the words and choose the right picture",
      image:
        "https://storage.googleapis.com/road-dashboard/shared/vocab-logo.png",
      name: "Vocabulary",
    },
    // this is the 'variantParams' coming back from appkit.
    // {
    //     "maxTime": 5,
    //     "skipInstructions": true,
    //     "userMode": "4AFC",
    //     "recruitment": "school",
    //     "numTrialsTotal": 48,
    //     "consent": true,
    //     "audioFeedback": "binary",
    //     "story": true
    // }
    variant: {
      description: "a variant of vocab",
      age: null,
      buttonLayout: "default",
      corpus: "vocab-item-bank",
      keyHelpers: false,
      language: "en",
      maxIncorrect: 3,
      maxTime: 100,
      numOfPracticeTrials: 2,
      numOfTrials: 300,
      sequentialPractice: true,
      sequentialStimulus: true,
      skipInstructions: true,
      stimulusBlocks: 3,
      stormItemId: false,
      taskName: "vocab",
    },
  },
  'egma-math': {
    task: {
        description: "Solve the math problems",
        name: "Math Game",
        image: "https://storage.googleapis.com/road-dashboard/shared/math-logo.png",
        studentFacingName: "Math Game",

    },
    variant: {
        age: null,
        buttonLayout: "default",
        corpus: "math-item-bank",
        keyHelpers: false,
        language: 'en',
        maxIncorrect: 3,
        maxTime: 100,
        numOfPracticeTrials: 2,
        numOfTrials: 300,
        sequentialPractice: true,
        sequentialStimulus: true,
        skipInstructions: true,
        stimulusBlocks: 3,
        stormItemId: false,
        taskName: 'egma-math'
    }
  }
};
