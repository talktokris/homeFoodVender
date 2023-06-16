export default {
  serverUrl: "http://localhost:8000",
  apiUrl: "http://localhost:8000/api",
  imageUrl: "http://localhost:8000/vender_images",
};

/* Live settings


  serverUrl: "https://stjobagency.com/",
  apiUrl: "https://stjobagency.com/backend_api/api",
  imageUrl: "https://stjobagency.com/assets/images/",



    serverUrl: "http://localhost/prabhu_jobs/web-app/backend/public",
  apiUrl: "http://localhost/prabhu_jobs/web-app/backend/public/api",
  imageUrl:
    "http://localhost/prabhu_jobs/web-app/backend/public/assets/images/",



*/

/*
import { Constants } from "expo-constants";

const settings = {
  dev: {
    serverUrl: "http://localhost/prabhu_jobs/web-app/backend/public",
    apiUrl: "http://localhost/prabhu_jobs/web-app/backend/public/api",
    imageUrl:
      "http://localhost/prabhu_jobs/web-app/backend/public/assets/images/",
  },
  staging: {
    serverUrl: "https://www.prabhutravel.com/jobmobile/",
    apiUrl: "https://www.prabhutravel.com/jobmobile/api",
    imageUrl: "https://www.prabhutravel.com/jobmobile/assets/images/",
  },
  production: {
    serverUrl: "https://www.prabhutravel.com/jobmobile/",
    apiUrl: "https://www.prabhutravel.com/jobmobile/api",
    imageUrl: "https://www.prabhutravel.com/jobmobile/assets/images/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.menifiest.releaseChannel === "staging") return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
*/
