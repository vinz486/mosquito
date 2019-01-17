import ClientFactory from './ClientFactory';

class ClientManager{
	constructor(){
		this._clientMap = new Map();
	}
	add(client){
		this._clientMap.set(client.ID,client);
	}
	remove(client){
		this._clientMap.delete(client.ID);
	}
}
export default ClientManager;
