import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export const EditTaskData = () => {
	const params = useParams()
	const projectId = params.projectId!
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const taskId = queryParams.get('editTask')!

	const { data } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById({ projectId: projectId, taskId: taskId }),
		enabled: !!taskId// converts variable to boolean based on its value
	})

	if (data) return <EditTaskModal />
}
