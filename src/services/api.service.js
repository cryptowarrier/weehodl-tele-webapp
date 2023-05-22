import axios from "axios";

const baseUrl = `http://109.105.198.249:8080/web-app`;

export const withdrawQuery = async (payload) => {
  const response = await axios.post(`${baseUrl}/withdraw`, payload);
  return response;
}