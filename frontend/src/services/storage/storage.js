/**
 * Abstract Class Storage
 * @class Storage
 */
export class Storage {
	constructor() {
		if (this.constructor === Storage) {
			throw new Error('Abstract classes can\'t be instantiated.');
		}
	}
	set() {
		throw new Error("Method 'set()' must be implemented.");
	}
	get() {
		throw new Error("Method 'set()' must be implemented.");
	}
	remove() {
		throw new Error("Method 'remove()' must be implemented.");
	}
	clear() {
		throw new Error("Method 'clean()' must be implemented.");
	}
}
