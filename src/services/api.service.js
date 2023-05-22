import axios from "axios";
import { botToken } from "../constants"

const baseUrl = `http://109.105.198.249:8080/web-app`;

export const sendMessage = async (payload) => {
  const response = await axios.post(`${baseUrl}/withdraw`, payload);
  return response;
}