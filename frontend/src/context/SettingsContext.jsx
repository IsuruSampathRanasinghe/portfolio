import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSettings,
} from "../services/settingsService";

const SettingsContext =
  createContext(null);

export const SettingsProvider = ({
  children,
}) => {
  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchSettings =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getSettings();

        setSettings(data);
        setError("");
      } catch (error) {
        console.error(
          "Failed to load portfolio settings:",
          error
        );

        setError(
          error.response?.data
            ?.message ||
            "Unable to load portfolio information."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        setSettings,
        refetchSettings:
          fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const usePortfolioSettings =
  () => {
    const context =
      useContext(
        SettingsContext
      );

    if (!context) {
      throw new Error(
        "usePortfolioSettings must be used inside SettingsProvider"
      );
    }

    return context;
  };