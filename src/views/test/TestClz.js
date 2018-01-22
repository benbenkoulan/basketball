export default class TestClz {
	constructor(name){
		this.name = name;
	}

	static getName(){
		console.log(this);
		return 'abc';
	}
}