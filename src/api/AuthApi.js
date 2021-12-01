import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000", // Enter url of express server here
});
