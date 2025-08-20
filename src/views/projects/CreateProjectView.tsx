import { Link } from "react-router-dom"

export const CreateProjectView = () => {
	return (
		<>
			<h1 className="text-5xl font-black">Create Project</h1>
			<p className="text-2xl font-light text-gray-500 mt-5">Fill the form to create a project</p>

			<nav className="my-5">
				<Link
				className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
				to="/"
			>Return to projects</Link>
			</nav>
		</>
	)
}
