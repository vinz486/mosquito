import ClientFactory from './ClientFactory';
import ClientManager from './ClientManager';

const clientManager = new ClientManager();
const fakeClients = [{'sghdfahd': {x: 120, y: 45}}, {'sghrdfahd': {x: 34, y: 45}}, {'sghydfahd': {x: 12, y: 3}}];
fakeClients.forEach((k) => {
	const id = Object.keys(k)[0];
	const client = ClientFactory.makeFromStatus({id: Object.keys(k)[0], x: k[id].x, y: k[id].y});
	clientManager.add(client);
});
console.log(clientManager);
