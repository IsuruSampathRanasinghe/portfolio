import { useEffect, useState } from "react";
import { getSettings } from "../services/settingsService";

const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const data = await getSettings();

        setSettings(data);
        setError("");
      } catch (error) {
        console.error("Failed to load portfolio settings:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load portfolio information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
  };
};

export default useSettings;