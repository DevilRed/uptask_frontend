import type { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export const SearchResult = ({ user, reset }: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["projectTeam", projectId],
      });
    },
  });
  const handleAddUserToProject = () => {
    mutate({ projectId, id: user._id });
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Result:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Add to project
        </button>
      </div>
    </>
  );
};
