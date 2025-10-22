import { useForm } from "react-hook-form";
import type { NoteFormData } from "@/types/index";
import { ErrorMessage } from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export const AddNoteForm = () => {
  const params = useParams();
  const location = useLocation();

  // get url params after ?
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const handleAddNote = (formData: NoteFormData) => {
    //projectId, taskId is in url
    mutate({ projectId, taskId, formData });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddNote)} className="space-y-3" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Create Note
        </label>
        <input
          type="text"
          id="content"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "Content is required",
          })}
        />
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      </div>
      <input
        type="submit"
        value="Create note"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
};
