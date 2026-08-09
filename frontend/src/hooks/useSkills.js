import { useEffect, useState } from "react";

import { getSkills } from "../services/skillService";

const useSkills = (params = {}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);

        const data = await getSkills(params);

        setSkills(data.skills || []);
        setError("");
      } catch (error) {
        console.error("Failed to load skills:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load skills."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
  };
};

export default useSkills;