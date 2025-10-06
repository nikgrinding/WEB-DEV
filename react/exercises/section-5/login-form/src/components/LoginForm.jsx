import { useState } from 'react';
import './LoginForm.css';

export default function LoginForm() {
	const [inputType, setInputType] = useState('password');
	function toggle() {
		inputType === 'password'
			? setInputType('text')
			: setInputType('password');
	}
	return (
		<>
			<div>
				<input placeholder="Email" className="styled-input" />
			</div>
			<div>
				<input
					placeholder="Password"
					type={inputType}
					className="styled-input"
				/>
				<button onClick={toggle}>Show</button>
			</div>
			<button className="styled-button">Login</button>
			<button className="styled-button">Sign up</button>
		</>
	);
}
