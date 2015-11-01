//dictionary (hash)
//each item has key,

function Dictionary(){
	this.insert = function(item){
		// overwrite any existing key

	};
	this.delete = function(item){};
	this.search = function(key){};
}
//Can do all ops in log(n) using Balanced Bin. Trees, e.g. AVL trees
//But, using hash (RAM model) we can search in constant time

/*
 n: number of keys (subset of keyspace)
 m: size of hash table
*/

/* Hash Functions */
// better if hash_size is prime, not close to power of 2
function division_method(key, hash_size) {
	return key % hash_size;
}

function multiplication_method(key, hash_size) {
	var a, w, r;
	//hash_size = 2^r;
	a = 341; //some random integer
	// odd, and not close to power of 2
	w = 64; // word size
	r = Math.log2(hash_size);
	return [(a * k) % Math.pow(2,w)] >> (w - r);
}

function universal(key, hash_size) {
	var a, b, p;
	//a,b random numbers in {0, p-1}
	//p is lange prime number, bigger than size of keyspace
	return ((a*key + b) mod p) mod hash_size;
}