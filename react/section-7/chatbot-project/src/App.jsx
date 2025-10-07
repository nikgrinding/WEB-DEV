import { useState, useEffect } from 'react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { Chatbot } from 'supersimpledev';
import './App.css';

function App() {
	const [chatMessages, setChatMessages] = useState(
		JSON.parse(localStorage.getItem('chatMessages')) || []
	);

	function clearMessages() {
		localStorage.removeItem('chatMessages');
		setChatMessages([]);
	}

	useEffect(() => {
		Chatbot.addResponses({ stupid: 'no, i am not', 'pls work': "i won't" });
	}, []);

	useEffect(() => {
		localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
	}, [chatMessages]);

	return (
		<div className="app-container">
			<ChatMessages chatMessages={chatMessages} />
			<ChatInput
				chatMessages={chatMessages}
				setChatMessages={setChatMessages}
				clearMessages={clearMessages}
			/>
		</div>
	);
}

export default App;
