import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1"; // Change to your backend

export const createChat = async (userId, message) => {
  const res = await axios.post(`${BASE_URL}/chat/create`, {
    userId,
    messages: [{ role: "user", content: message }],
  });
  return res.data.data;
};

export const getUserChats = async (userId) => {
  const res = await axios.get(`${BASE_URL}/chat/user/${userId}`);
  return res.data.data;
};

export const sendMessageToChat = async (chatId, message) => {
  const res = await axios.post(`${BASE_URL}/chat/message`, {
    chatId,
    message,
  });
  return res.data.data;
};
