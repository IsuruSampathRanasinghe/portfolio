import api from "./api";

export const getSettings =
  async () => {
    const { data } =
      await api.get(
        "/settings"
      );

    return data.settings;
  };

export const updateSettings =
  async (settingsData) => {
    const { data } =
      await api.put(
        "/settings",
        settingsData
      );

    return data;
  };