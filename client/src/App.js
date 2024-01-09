import io from 'socket.io-client';
import { useState } from 'react';
import './index.css';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');

function App() {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [joinedRoom, setJoinedRoom] = useState(false);

	const joinRoom = () => {
		if (name.trim() !== '' && room.trim() !== '') {
			socket.emit('join_room', room);
			setJoinedRoom(true);
		}
	};

	if (joinedRoom) {
		return (
			<div className="w-screen flex flex-col justify-center items-center">
				<Chat socket={socket} name={name} roomId={room} />
			</div>
		);
	} else {
		return (
			<div className="w-screen h-screen flex flex-col justify-center items-center">
				<div class="area flex items-center justify-center">
					<ul class="z-0 circles">
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
					<div className="z-10 border border-indigo-900 h-1/6 flex flex-col justify-center px-10 py-20 rounded-md">
						<h3 className="text-center text-xl text-white">Join a chat</h3>
						<div className="mb-4 mt-2">
							<input type="text" placeholder="john" className="border outline-none border-gray-600 mr-2 px-2 py-1 rounded-sm" onChange={(e) => setName(e.target.value)} />
							<input type="text" placeholder="room no" className="border outline-none border-gray-600 mr-2 px-2 py-1 rounded-sm" onChange={(e) => setRoom(e.target.value)} />
						</div>
						<button className="mr-2 px-6 py-1 bg-blue-600 text-white rounded-sm w-max self-center" onClick={joinRoom}>
							join
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
