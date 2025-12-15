import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingGif from '../assets/loading-spinner.gif';
import dayjs from 'dayjs';
import './ChatInput.css';

export default function ChatInput({
	chatMessages,
	setChatMessages,
	clearMessages,
}) {
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function saveInputText(event) {
		setInputText(event.target.value);
	}

	async function sendMessage() {
		if (isLoading || !inputText) {
			return;
		}
		const newMessages = [
			...chatMessages,
			{
				message: inputText,
				sender: 'user',
				time: dayjs(dayjs().valueOf()).format('h:mma'),
				key: crypto.randomUUID(),
			},
		];
		setChatMessages(newMessages);

		setInputText('');
		setIsLoading(true);
		setChatMessages([
			...newMessages,
			{
				message: <img src={LoadingGif} className="loading-spinner" />,
				sender: 'robot',
				time: dayjs(dayjs().valueOf()).format('h:mma'),
				key: crypto.randomUUID(),
			},
		]);

		setChatMessages([
			...newMessages,
			{
				message: await Chatbot.getResponseAsync(inputText),
				sender: 'robot',
				time: dayjs(dayjs().valueOf()).format('h:mma'),
				key: crypto.randomUUID(),
			},
		]);
		setIsLoading(false);
	}

	function trackKeys(event) {
		if (event.key === 'Enter') {
			sendMessage();
		} else if (event.key === 'Escape') {
			setInputText('');
		}
	}

	return (
		<div className="chat-input-container">
			<input
				placeholder="Send a message to Chatbot"
				size="30"
				onChange={saveInputText}
				value={inputText}
				onKeyDown={trackKeys}
				className="chat-input"
			/>
			<button onClick={sendMessage} className="send-button">
				Send
			</button>
			<button onClick={clearMessages} className="clear-button">
				Clear
			</button>
		</div>
	);
}
