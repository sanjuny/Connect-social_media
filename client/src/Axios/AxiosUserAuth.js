import axios from "axios";
const baseURL = process.env.REACT_APP_API_USER_URL
// const baseURL = "https://connectgram.website/api";
// const baseURL = "http://localhost:5000/api";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let Userinstance = axios.create(defaultOptions);

// Set the AUTH token for any request
Userinstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("userToken");
  console.log(token, "verifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  config.headers.accesstoken = token;
  return config;
});

export default Userinstance;