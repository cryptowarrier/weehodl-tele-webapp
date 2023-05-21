import axios from "axios";
import { botToken } from "../constants"

const baseUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

export const sendMessage = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  return response;
}