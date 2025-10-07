import { getProjectById } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { EditProjectForm } from "./EditProjectForm";

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId], // using dynamic params to avoid cache issues
    queryFn: () => getProjectById(projectId), // using arrow fn to pass a parameter to the function
    retry: false,
  });

  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    return <Navigate to="/404" />;
  }
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
};
