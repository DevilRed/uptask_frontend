import { Logo } from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

export const AppLayout = () => {
	return (
		<>
			<header className="bg-gray-800 py-5"
			>
				<div className="max-w-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
					<div className="w-64">
						<Link to="/">
							<Logo />
						</Link>
					</div>
					<NavMenu />
				</div>
			</header>

			<section className="max-w-2xl mx-auto mt-10 p-5">
				<Outlet />
			</section>

			<footer className="py-5">
				<p className="text-center">
					All rights reserved - { new Date().getFullYear() }
				</p>
			</footer>
			<ToastContainer />
		</>
	)
}
