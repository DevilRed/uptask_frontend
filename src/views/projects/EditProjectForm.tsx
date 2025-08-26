import { updateProject } from "@/api/ProjectAPI"
import ProjectForm from "@/components/projects/ProjectForm"
import type { Project, ProjectFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type EditProjectFormProps = {
	data: ProjectFormData,
	projectId: Project['_id']
}
export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationFn: updateProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data)
			navigate('/')
		},
	})
	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			projectName: data.projectName,
			clientName: data.clientName,
			description: data.description,
		}
	})

	const handleForm = (formData: ProjectFormData) => {
		const data = {
			formData,
			projectId
		}
		mutate(data)
	}


	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black">Edit Project</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">Fill the form to edit the project</p>

				<nav className="my-5">
					<Link
						className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
						to="/"
					>Return to projects</Link>
				</nav>

				<form
					className="mt-10 bg-white shadow-lg p-10 rounded-lg"
					onSubmit={handleSubmit(handleForm)}
					noValidate
				>
					<ProjectForm
						register={register}
						errors={errors}
					/>
					<input
						type="submit"
						value="Save changes"
						className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
					/>
				</form>
			</div>
		</>
	)
}
