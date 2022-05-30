import io from 'socket.io-client';

import { CONNECTION_URL } from '../constants/connection';

const socket = io.connect(CONNECTION_URL);

socket.on('disconnect', () => {
  socket.removeAllListeners();
});

export default socket;
