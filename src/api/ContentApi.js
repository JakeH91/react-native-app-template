import axios from "axios";

export default axios.create({
  baseURL: "https://hojaja-cms-server.herokuapp.com", // Enter url of cms template here
});
