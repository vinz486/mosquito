import Client from './Client';
class ClientFactory{
	static makeFrom(id){
		return new Client({id:id});
	}
	static makeFromStatus({id,x,y}){
		return new Client({id,x,y});
	}
}
export default ClientFactory;
