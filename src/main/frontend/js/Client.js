import Cursor from './Cursor';

class Client {
	constructor({id, x = 0, y = 0}) {
		this.ID     = id;
		this.cursor = new Cursor(this.ID);
		this.cursor.x = x;
		this.cursor.y = y;
	}

	set ID(id) {
		this._id = id;
	}

	get ID() {
		return this._id;
	}

	set cursor(cursor) {
		this._cursor = cursor;
	}

	get cursor() {
		return this._cursor;
	}
}

export default Client;
