import React, {useReducer, useState} from "react";
import loginReducer from "../reducers/login.reducer.js";
import {loginFetch} from "../actions/login.action.js";
import homepageImage from "../assets/Image-12.jpg";
import logo from "../assets/Group-40.svg";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {MdLock} from "react-icons/md";
import {FaRegEnvelope} from "react-icons/fa";
import {
	loginInput,
	loginSuccess,
	loginError,
	loginLoading
} from "../actions/login.action.js";
import PropTypes from "prop-types";

const initialState = {
	phone: "",
	password: "",
	isLoading: false,
	error: "",
	isLoggedIn: false
};

function Login(props) {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const {phone, password, isLoading, error, isLoggedIn} = state;
	const displayPasswordHandler = () => {
		return setIsPasswordVisible(prevState => !prevState);
	};
	const submitHandler = async e => {
		e.preventDefault();
		dispatch(loginLoading(true));
		try {
			const data = await (await loginFetch({phone, password})).json();
			if (data.status === 422 || data.status === 403) {
				return dispatch(loginError(data.error));
			}
			dispatch(loginSuccess());
			console.log(data.data[0]);
		} catch (error) {
			dispatch(loginError());
		}
	};
	return (
		<div className="font-display">
			<div
				className="flex"
				style={{
					backgroundColor: "#ffffff"
				}}>
				<div
					className="flex-1 bg-no-repeat bg-center bg-cover relative h-screen ml-128px flex flex-col justify-between pb-50px"
					style={{
						backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7),transparent,transparent,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${homepageImage})`,
						width: "503px"
					}}>
					<div className="mt-20px ml-53px">
						<img
							src={logo}
							className="h-109px w-153px"
							alt="rubeepays"
						/>
					</div>
					<div className="text-white mt-20px ml-53px">
						<div className="text-30px font-calibre">
							Invest in a Food Secured Future
						</div>
						<p className="text-15px font-calibre">
							Lorem ipsum dolor sit amet, consetetur
							<br /> sadipscing elitr, sed diam nonumy eirmod
							<br /> tempor invidunt ut labore et dolore magna
						</p>
						<button className="bg-custom-green rounded-tr-8px rounded-bl-8px inline-block px-23px py-7px font-calibre text-15px flex justify-center item-center">
							Create a Thrive AOS Account
						</button>
					</div>
				</div>
				<div className="flex-1-5 pt-128px pl-43px">
					<form onSubmit={submitHandler}>
						<div className="mb-20px">
							<div className="text-24px tracking-tighter">
								Login to Thrive AOS
							</div>
							<div className="text-15px">
								Enter your details below
							</div>
						</div>
						{error && <p className="text-red-600">{error}</p>}
						<label
							htmlFor="login-phone"
							className="mb-11px text-12px">
							Thrive ID
						</label>
						<div className="mb-33px w-338px border-gray-300 border border-solid  px-3px py-3px flex items-center rounded-4px">
							<span className="inline-block w-5%">
								{<FaRegEnvelope />}
							</span>
							<input
								type="text"
								name="phone"
								id="login-phone"
								value={phone}
								onChange={e => dispatch(loginInput(e))}
								className="inline-block w-90% p-1 outline-none"
							/>
						</div>
						<label
							htmlFor="login-password"
							className="mb-11px text-12px">
							Password
						</label>
						<div className="w-338px relative border-gray-300 border border-solid relative px-3px py-3px flex items-center rounded-4px">
							<span className="inline-block w-5%">
								{<MdLock />}
							</span>
							<input
								type={`${
									isPasswordVisible === true
										? "text"
										: "password"
								}`}
								name="password"
								id="login-password"
								value={password}
								onChange={e => dispatch(loginInput(e))}
								className="inline-block w-90% p-1 outline-none"
							/>
							<span
								className="inline-block w-5%"
								onClick={displayPasswordHandler}>
								{isPasswordVisible === true ? (
									<FiEye />
								) : (
									<FiEyeOff />
								)}
							</span>
						</div>
						<a
							className="block text-right text-12px text-gray-600 no-underline w-338px mb-33px"
							href="#">
							Forgot your password?
						</a>
						<button
							type="submit"
							disabled={isLoading}
							className={`px-43px py-5px flex justify-center item-center text-white rounded-tr-8px rounded-bl-8px font-calibre text-15px ${
								isLoading === true
									? "bg-green-400"
									: "bg-custom-green"
							}`}>
							{isLoading ? "Logging" : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

Login.propTypes = {};

export default Login;
