import { useEffect, useState } from "react";
import { getEducation } from "../services/educationService";

const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation();
        setEducation(data.education || []);
        setError("");
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load education."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return {
    education,
    loading,
    error,
  };
};

export default useEducation;