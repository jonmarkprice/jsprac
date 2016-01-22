// Node keeps trying to parse comments...
// this is from bst.js

this.deleteValue = function(value) {
	return deleteR(value, this.root);
}
function deleteR(value, root) {
	//if root is empty, do nothing
	if (root.value === null) {
		return false;
	}
	else if (value < root.value) {
		// we want to go left
		if (root.left === null) {
			return false;
		}
		else { // keep looking
			return deleteR(value, root.left);
		}
	}
	else if (value > root.value) {
		// we want to go right
		if (root.right === null) {
			return false;
		}
		else {
			// keep looking
			return deleteR(value, root.right);
		}
	}
	else { //if equal
		//1. the node is at a leaf
		if (root.left === null && root.right === null) {
			// delete the node
			root = null;
			return true;
		}
		//2. the (deleted) node has exactly 1 child
		if () {
			// connect the child to the parent of the deleted node
		}

		// recur here
		//3 the node has children
			// choose one of the children to be the "new root"
				// i.e. to be connected to the parent of the deleted node
			// 3.1 if the left node has no right child, make it's left child
				// be the other child of the deleted node
			//3.2 if the right ...
			//3.3 if the selected child has a child on the side
				// choose one of it's children ... recur...
		return true;
	}
}
