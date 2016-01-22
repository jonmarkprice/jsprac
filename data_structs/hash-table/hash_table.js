// hash table
// currently supporting integers only.

var hash_size = 25;
// TODO: Array or new Array ?
var table = new Array(hash_size);
for (var i = 0; i < hash_size; ++i) {
	table[i] = [];
}

// XXX no support for "chaining"
function hash(value) {
	//a perfect hash for integers 0-24
	//0,25; 1,26; 2,27 ... will all have same value
	//and will *overwrite* each other.
	return value % hash_size;
}

function add(value) {
	// calculate the key using the hashing function
	var key = hash(value);

	// store the value in the "key-th" postion of the array
	table[key].push(value);
}

function get_value(key) {
	return table[key];
}