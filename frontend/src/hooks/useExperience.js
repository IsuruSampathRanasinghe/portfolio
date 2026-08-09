import { useCallback, useEffect, useState } from "react";
import { getExperiences } from "../services/experienceService";

const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiences();

      setExperiences(data.experiences || []);
    } catch (error) {
      console.error("Failed to fetch experience:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load experience."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
};

export default useExperience;