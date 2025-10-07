import axios from "axios";
import bus from "@/util/Bus";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use(
  function(request) {
    request.headers.token = sessionStorage.getItem("token");
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    bus.$emit(bus.error, error.response.data.message);
    return Promise.reject(error);
  }
);

export default axios;
