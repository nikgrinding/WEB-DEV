import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';

function useAutoScroll(dependencies) {
	const ref = useRef(null);
	useEffect(() => {
		const containerElement = ref.current;
		if (containerElement) {
			containerElement.scrollTop = containerElement.scrollHeight;
		}
	}, dependencies);
	return ref;
}

export default function ChatMessages({ chatMessages }) {
	const chatMessagesRef = useAutoScroll([chatMessages]);
	if (chatMessages.length === 0) {
		return (
			<div className="chat-messages-container welcome-line">
				Welcome to the chatbot project! Send a message using the textbox
				below.
			</div>
		);
	}

	return (
		<div className="chat-messages-container" ref={chatMessagesRef}>
			{chatMessages.map(({ message, sender, time, key }) => {
				return (
					<ChatMessage
						message={message}
						sender={sender}
						time={time}
						key={key}
					/>
				);
			})}
		</div>
	);
}
