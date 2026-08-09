import api from "./api";

// Public - send contact message
export const sendContactMessage = async (payload) => {
  const { data } = await api.post("/contact", payload);

  return data;
};

// Admin - get all contact messages
export const getContactMessages = async (params = {}) => {
  const { data } = await api.get("/contact", {
    params,
  });

  return data;
};

// Admin - get one message
export const getContactMessageById = async (id) => {
  const { data } = await api.get(`/contact/${id}`);

  return data;
};

// Admin - update message status
export const updateContactMessageStatus = async (
  id,
  status
) => {
  const { data } = await api.put(
    `/contact/${id}`,
    {
      status,
    }
  );

  return data;
};

// Admin - delete message
export const deleteContactMessage = async (id) => {
  const { data } = await api.delete(`/contact/${id}`);

  return data;
};