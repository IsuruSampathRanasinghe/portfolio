import api from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await api.post(
    "/upload/image",
    formData
  );

  return data;
};

export const deleteImage = async (publicId) => {
  const { data } = await api.delete(
    "/upload/image",
    {
      data: {
        publicId,
      },
    }
  );

  return data;
};