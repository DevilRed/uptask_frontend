import { z } from "zod";

// projects
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
})
export const DashboardProjectSchema = z.array(
	projectSchema.pick({
		_id: true,
		clientName: true,
		projectName: true,
		description: true,
	})
)

export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, "clientName" | "projectName" | "description">