import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const data = await getProjects(params);

        setProjects(data.projects || []);
        setPagination(data.pagination || null);
        setError("");
      } catch (error) {
        console.error("Failed to load projects:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    pagination,
    loading,
    error,
  };
};

export default useProjects;