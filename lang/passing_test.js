function caller() {
	var obj = {a: 1, b: 2};
	console.log(obj);
	callee(obj);
	console.log(obj);
}

function callee(obj) {
	obj.a = null;
}