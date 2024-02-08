export default {
  // serverUrl: "https://homefood.com.my/backend",
  // apiUrl: "https://homefood.com.my/backend/api",
  // imageUrl: "https://homefood.com.my/backend/vender_images",

  serverUrl:
    "http://192.168.254.5/projects/homefood/backend/homefood-backend/public",
  apiUrl:
    "http://192.168.254.5/projects/homefood/backend/homefood-backend/public/api",
  imageUrl:
    "http://192.168.254.5/projects/homefood/backend/homefood-backend/public/vender_images",
};
/*

  serverUrl:
    "http://ohm-macbook-pro.local/projects/homefood/backend/homefood-backend/public",
  apiUrl:
    "http://ohm-macbook-pro.local/projects/homefood/backend/homefood-backend/public/api",
  imageUrl:
    "http://ohm-macbook-pro.local/projects/homefood/backend/homefood-backend/public/vender_images",
};

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
