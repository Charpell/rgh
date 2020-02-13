import React from "react";
import Login from "./components/Login.jsx";
import dotenv from 'dotenv'
dotenv.config()


function App() {
	return (
		<div className="App">
			<Login />
		</div>
	);
}

export default App;
