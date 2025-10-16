import { getTaskById, updateStatus } from "@/api/TaskAPI";
import { statusTranslations } from "@/locales/es";
import type { TaskStatus } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, type ChangeEvent } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function TaskModalDetails() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const show = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryFn: () => getTaskById({ projectId, taskId }),
    queryKey: ["task", taskId],
    enabled: !!taskId,
    retry: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message, { toastId: "error" });
    },
    onSuccess: (data) => {
      toast.success(data, { toastId: "success" });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const data = { projectId, taskId, status };
    mutate(data);
  };

  if (isError) {
    toast.error(error.message, { toastId: "error" }); // set toastId to avoid show error unecessarily
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </TransitionChild>
            TransitionChild
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">Added on: {formatDate(data.createdAt)}</p>
                    <p className="text-sm text-slate-400">
                      Last update: {formatDate(data.updatedAt)}
                    </p>
                    <DialogTitle as="h3" className="font-black text-4xl text-slate-600 my-5">
                      {data.name}
                    </DialogTitle>
                    <p className="text-lg text-slate-500 mb-2">Description: {data.description}</p>
                    <p className="text-2xl text-slate-500 mb-2">Change history:</p>
                    <ul className="list-decimal">
                      {data.completedBy.map((activityLog) => (
                        <li key={activityLog._id}>
                          <span className="font-bold text-slate-600">{activityLog.status}</span> by:
                          {activityLog.user?.name}
                        </li>
                      ))}
                    </ul>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Status: {data.status}</label>
                      <select
                        className="w-full border p-3 bg-white border-gray-300"
                        defaultValue={data.status}
                        onChange={handleChangeStatus}
                      >
                        {Object.entries(statusTranslations).map((status) => (
                          <option key={status[0]} value={status[0]}>
                            {status[1]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </DialogPanel>
                </TransitionChild>
                TransitionChild
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
