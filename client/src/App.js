import io from 'socket.io-client';
import { useState } from 'react';
import './index.css';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');

function App() {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const joinRoom = () => {
		if (name.trim() !== '' && room.trim() !== '') {
			socket.emit('join_room', room);
		}
	};

	return (
		<div className="w-screen flex flex-col justify-center items-center">
			<div>
				<h3 className="text-center">Join a chat</h3>
				<input type="text" placeholder="john" className="border border-gray-600 mr-2 px-2 rounded-sm" onChange={(e) => setName(e.target.value)} />
				<input type="text" placeholder="room no" className="border border-gray-600 mr-2 px-2 rounded-sm" onChange={(e) => setRoom(e.target.value)} />
				<button className="border border-gray-600 mr-2 px-2 rounded-sm" onClick={joinRoom}>
					join
				</button>
			</div>
			<Chat socket={socket} name={name} roomId={room} />
		</div>
	);
}

export default App;
