import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

export const withdrawQuery = async (payload) => {
  const response = await axios.post(`${baseUrl}/withdraw`, payload);
  return response;
}

export const investQuery = async (payload) => {
  const response = await axios.post(`${baseUrl}/invest`, payload);
  return response;
}