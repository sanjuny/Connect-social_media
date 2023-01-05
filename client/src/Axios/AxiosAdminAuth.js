import axios from "axios";
const baseURL = "https://connectgram.website/api/admin";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("AdminToken");
  console.log(token, "verifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  config.headers.accesstoken = token;
  return config;
});

export default instance;