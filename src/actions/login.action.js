import {
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_LOADING_STATUS
} from "./action-types/action.types";

const url = process.env.REACT_APP_LOGIN_WEB_URL;

const initialLoginData = {
	phone: "",
	password: ""
};

export const loginFetch = (loginData = initialLoginData) => {
	return fetch(`${url}/users/authorize`, {
		method: "POST",
		body: JSON.stringify(loginData),
		headers: {
			"Content-Type": "application/json"
		}
	});
};

export const loginInput = event => {
	const {name, value} = event.currentTarget;
	return {
		type: LOGIN_USER,
		payload: {
			[name]: value
		}
	};
};

export const loginSuccess = () => {
	return {
		type: LOGIN_SUCCESS,
		payload: {
			isLoading: false,
			isLoggedIn: true,
			error: ""
		}
	};
};
export const loginError = (error = "Incorrect username or password") => {
	return {
		type: LOGIN_ERROR,
		payload: {
			isLoading: false,
			isLoggedIn: false,
			error
		}
	};
};
export const loginLoading = (bool = false) => {
	return {
		type: LOGIN_LOADING_STATUS,
		payload: {
			isLoading: bool,
			error: ""
		}
	};
};
