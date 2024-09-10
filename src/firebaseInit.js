import { OfflineFirekit, RoarFirekit } from '../firekit/index';
import roarFirebaseConfig from './config/firebaseRoar';
import levanteFirebaseConfig from './config/firebaseLevante';

const roarConfig = import.meta.env.MODE === 'LEVANTE' ? levanteFirebaseConfig : roarFirebaseConfig;

export async function initNewFirekit() {
  const firekit = new RoarFirekit({
    roarConfig,
    authPersistence: 'local',
    markRawConfig: {
      auth: false,
      db: false,
      functions: false,
    },

  verboseLogging: import.meta.env.MODE === 'LEVANTE' ? false : true,
});
return await firekit.init();
}
