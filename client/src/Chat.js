import React, { useEffect, useState } from 'react';
import './index.css';

const Chat = ({ socket, name, roomId }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const sendMessage = async () => {
		if (currentMessage.trim() !== '') {
			const messageData = {
				roomId: roomId,
				author: name,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			};

			await socket.emit('send_msg', messageData);
			setMessages((current) => [...current, messageData]);
			setCurrentMessage('');
		}
	};

	useEffect(() => {
		socket.off('receive_msg');
		socket.on('receive_msg', (data) => {
			setMessages((current) => [...current, data]);
		});
	}, [socket]);

	const otherPerson = 'ml-4 mt-2 w-max max-w-sm px-4 py-1 rounded-t-xl rounded-br-xl bg-gradient-to-r from-amber-400 to-orange-600 text-white';
	const you = 'mr-4 mt-2 self-end w-max max-w-sm px-4 py-1 rounded-t-xl rounded-bl-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white';

	return (
		// css background starts here
		<div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			{/* css background ends here */}

			<div className="w-screen flex flex-col h-screen items-center backdrop-blur-sm">
				{/* header */}
				<div>
					<p className="text-center text-xl mt-5 mb-2 text-white">Live Chat</p>
				</div>
				{/* body */}
				<div className="border border-indigo-700 shadow-2xl h-5/6 w-4/6 rounded-lg pl-2">
					<div className="h-5/6">
						<div className="flex flex-col h-full w-full overflow-y-auto py-2">
							{messages.map((data, i) => {
								return (
									<li key={i} className={data.author === name ? you : otherPerson}>
										<p>{data.message}</p>
										<p className="text-gray-300 text-end text-xs">{data.time}</p>
									</li>
								);
							})}
						</div>
					</div>

					{/* send message button */}
					<div className="h-1/6 flex items-center justify-center">
						<input
							type="text"
							value={currentMessage}
							className="w-10/12 h-9 outline-none mr-2 px-2 rounded-sm"
							onChange={(e) => setCurrentMessage(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
						/>
						<button className="border bg-blue-500 text-white border-blue-600 mr-2 px-2 rounded-sm h-9" onClick={sendMessage}>
							send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
