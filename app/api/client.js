import { create } from "apisauce";
import authStorage from "../auth/storage";
import settings from "../config/setting";

const apiClient = create({
  // baseURL: "http://192.168.254.4:9000/api",
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  if (!authToken) return;

  //request.headers["access_token"] = authToken;

  request.headers["Authorization"] = "Bearer " + authToken;
});

export default apiClient; 
