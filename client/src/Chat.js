import React, { useEffect, useState } from 'react';

const Chat = ({ socket, name, roomId }) => {
	const [currentMessage, setCurrentMessage] = useState('');

	const sendMessage = async () => {
		if (currentMessage.trim() !== '') {
			const messageData = {
				roomId: roomId,
				author: name,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			};

			await socket.emit('send_msg', messageData);
		}
	};

	useEffect(() => {
		socket.on('receive_msg', (data) => {
			console.log(data.message);
		});
	}, [socket]);
	return (
		<div>
			{/* header */}
			<div>
				<p>Live Chat</p>
			</div>
			{/* body */}
			<div></div>
			{/* footer */}
			<div className="mt-3">
				<input type="text" className="border border-gray-600 mr-2 px-2 rounded-sm" onChange={(e) => setCurrentMessage(e.target.value)} />
				<button className="border border-gray-600 mr-2 px-2 rounded-sm" onClick={sendMessage}>
					&#9658;
				</button>
			</div>
		</div>
	);
};

export default Chat;
