import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://skill-sync-be-dev-c4b597280ca7.herokuapp.com/api/admin-panel/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;