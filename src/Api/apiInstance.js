import axios from "axios";
import {appStore} from "../Store/appStore"

const apiInstance = axios.create({
  baseURL:
    "https://skill-sync-be-dev-c4b597280ca7.herokuapp.com/api/admin-panel/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((request) => {
  // const token = useSelector((state)=>state.users?.token);
  const token = appStore.getState()?.users?.token;
  console.log("🚀 ~ apiInstance.interceptorsrequest.use ~ token:", token)
  if (token) {
    request.headers.Authorization = `Token  ${token}`;
  }
  return request;
});

export default apiInstance;
