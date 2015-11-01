// recursive function
	// TODO 

// tail-recursive function:
function tailRecur(...) {
	return tailRecur_(defaultArg1, defaultArg2, ..., defaultArgN)
}
function tailRecur_(param1, param2, ..., paramN) {
	if (guard(param1, param2, paramN)) {
		return baseCase;
	}
	else { // rely on passing different parameters to function
		return tailRecur_(op1(param1), op2(param2), ..., opN(paramN));
	}
}

// iterative functions
function iterative(param1, param2, ..., paramN) {
	param1 = defaultArg1;
	param2 = defaultArg2;
	...
	paramN = defaultArgN;
	while (!guard(param1, param2, paramN)) {
		// rely on changing *state*
		param1 = op1(param1);
		param2 = op2(param1);
		...
		paramN = opN(param1);
	}
	return baseCase;
}

