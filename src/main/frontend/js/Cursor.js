class Cursor {
	constructor(clientID) {
		this._divElement = document.createElement('div');
		this._divElement.setAttribute('id',clientID);
		this._divElement.setAttribute('class','cursor');
		document.body.append(this._divElement);
	}

	set x(x) {
		this._x = x;
		this.move();
	}

	set y(y) {
		this._y = y;
		this.move();
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	move(){
		this._divElement.style.left = `${this.x}px`;
		this._divElement.style.top = `${this.y}px`;
	}
}

export default Cursor;
