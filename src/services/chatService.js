import apiURL from "../constants/apiURL";
import axios from "axios";

//post api to send a message and get a answer
export function postMessage(body) {
  return axios.post(`${apiURL}/v1/chat/send-message`, body);
}
