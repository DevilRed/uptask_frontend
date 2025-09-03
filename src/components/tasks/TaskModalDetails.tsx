import { getTaskById } from '@/api/TaskAPI';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function TaskModalDetails() {
	const params = useParams()
	const projectId = params.projectId!
	const navigate = useNavigate()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const taskId = queryParams.get('viewTask')!
	const show = taskId ? true : false

	const { data, isError, error } = useQuery({
		queryFn: () => getTaskById({ projectId, taskId }),
		queryKey: ['task', taskId],
		enabled: !!taskId,
		retry: false
	})

	if (isError) {
		toast.error(error.message, { toastId: 'error' })// set toastId to avoid show error unecessarily
		return <Navigate to={`/projects/${projectId}`} />
	}

	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
					</TransitionChild>TransitionChild

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
									<p className='text-sm text-slate-400'>Added on: </p>
									<p className='text-sm text-slate-400'>Last update: </p>
									<Dialog.Title
										as="h3"
										className="font-black text-4xl text-slate-600 my-5"
									>Task title
									</Dialog.Title>
									<p className='text-lg text-slate-500 mb-2'>Description:</p>
									<div className='my-5 space-y-3'>
										<label className='font-bold'>Status:</label>
									</div>
								</DialogPanel>
							</TransitionChild>TransitionChild
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
