const path = require('path');
const fs = require('fs');

let dataPath = path.resolve('./src/data');
let jsons = fs.readdirSync(dataPath);
let jsonObjs = jsons.map(json => {
	let jsonPath = path.join(dataPath, json);
	return {
		name: json,
		str: fs.readFileSync(jsonPath, 'UTF-8')
	};
});

let distPath = path.resolve('./dist');
let distJsonDirPath = path.join(distPath, 'data');
if(!fs.existsSync(distJsonDirPath)){
	fs.mkdirSync(distJsonDirPath);
}
jsonObjs.forEach(jsonObj => {
	let filepath = path.join(distJsonDirPath, jsonObj.name);
	if(fs.existsSync(filepath)){
		fs.unlinkSync(filepath);
	}
	fs.writeFileSync(filepath, jsonObj.str, { flag: 'a+' });
});