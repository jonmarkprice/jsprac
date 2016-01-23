'use strict';

function caller() {
	var obj = {a: 1, b: 2};
	console.log(obj);
	callee(obj);
	console.log(obj);
}

function callee(obj) {
	obj.a = null;
}

function caller2 () {
	var obj = {a: 1, b: 2};
	console.log(obj);
	callee2(obj);
	console.log(obj);
}

function callee2 () {
	obj = {}; // null
}

function caller3 () {
	var obj = {a: 1, b: 2};
	console.log(obj);
	callee3(obj);
	console.log(obj);
}

function callee3 () {
	delete obj; // error in strict mode
}