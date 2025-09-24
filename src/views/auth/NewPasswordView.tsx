import { NewPasswordForm } from "@/components/auth/NewPasswordForm"
import { NewPasswordToken } from "@/components/auth/NewPasswordToken"
import type { ConfirmToken } from "@/types/index"
import { useState } from "react"

export const NewPasswordView = () => {
	const [isValidToken, setIsValidToken] = useState(false)
	const [token, setToken] = useState<ConfirmToken['token']>('')
	return (
		<>
			<h1 className="text-5xl font-black text-white">Password Reset</h1>
			<p className="text-2xl font-light text-white mt-5">
				Use the code you got  {''}
				<span className=" text-fuchsia-500 font-bold"> on your email</span>
			</p>

			{!isValidToken ?
				<NewPasswordToken
					token={token}
					setToken={setToken}
					setIsValidToken={setIsValidToken}
				/> :
				<NewPasswordForm token={token} />}
		</>
	)
}
