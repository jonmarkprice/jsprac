/*
  TODO: see how bst, bst_rewrite, and this (bst_refactor) actually differ
  TODO: (high priority)
    1. test deleting the root of the node (as it is)
    2. if it doesn't work, refactor (see note)
    3. test the new 'insert' and 'search' methods
  ---
  TODO: write a tree printing function (nothing fancy (for now)).
  TODO: [?] experiment with pass-by-reference wrappers, or use pure functions.
  TODO: Test search
*/

/* Notes:
  I was issues with deleting an object (ie root = null) because this 
  is "pass by value" in a sense, and does not affect the 
  non-function-local copy of the object, ie has no affect.

  However, I could emulate this by setting all properties to null, ie
  left, right, and value.

  ---
  I did try to solve this using the parent, works except for root of
  the whole tree.
*/

/* Tested
- all but postOrder, because it's boring
*/

function BST() {
  'use strict';
  this.root = new Node(null);

  // public methods ////////////////////////////////////////////////
  
  // REFACTORING ////
  this.seek = function(value, onNull, onValue) {
    function recur(node, value, onNull, onValue, data) {
      var data = null;
      if (node === null) {
        console.log('root is null');
        return onNull(node, value);
      }
      else if (value === undefined) {
        console.log('value is undefined');
        return false;
      }
      else if (node.value < value) {
        console.log('going right');
        data = {parent: node, whichChild: 'right'};
        return recur(node.right, value, onNull, onValue, data);
      }
      else if (node.value > value) {
        console.log('going left');
        data = {parent: node, whichChild: 'left'};
        return recur(node.left, value, onNull, onValue, data);
      }
      else {
        console.log('value found');
        return onValue(node, value);
      }
    }
    console.log("root is ");
    console.log(this.root);
    return recur(this.root, value, onNull, onValue, null);
  }

  this.search = function(value) {
    console.log("searching for " + value);
    function onNull() { console.log('returning false'); return false; }
    function onValue() { console.log('returning true'); return true; }
    return this.seek(value, onNull, onValue);
  }

  // NOT TESTED
  this.insert = function(value) {
    function onNull(node, value) {
      node = new Node(value); //XXX still won't work
      return true;
    }
    return this.seek(value, onNull, function(){ return false; });
  }

  //TODO: add a delete function using the new seek method

  // end REFACTORING ////////////////////////////

  // NOT Supporting duplicates
  this.addValue = function(value) {
    function recur(value, root) {
      //if root is empty
      if (root.value === null) {
        root.value = value;
        return true;
      }
      else if (value < root.value) { // we want to go left
        if (root.left === null) {
          root.left = new Node(value);
          return true;
        }
        else { // keep looking
          return recur(value, root.left);
        }
      }
      else if (value > root.value) { // we want to go right
        if (root.right === null) {
          root.right = new Node(value);
          return true;
        }
        else { // keep looking
          return recur(value, root.right);
        }
      }
      else { //if equal
        console.log(value + ' already exists in tree.');
        return false;
      }
    }
    return recur(value, this.root);
  }

  this.preOrder = function() {
    var list = [];
    function recur(root) {
      if (root === null) {
        return;
      }
      //console.log(root.value);
      list.push(root.value);
      recur(root.left);
      recur(root.right);
    }
    recur(this.root);
    //console.log("pre-order traversal: ");
    //console.log(list);
    return list;
  }

  this.inOrder = function() {
    var list = [];
    function recur(root) {
      if (root === null) {
        return;
      }
      recur(root.left);
      //console.log(root.value);
      list.push(root.value);
      recur(root.right);
    }
    recur(this.root);
    //console.log("in-order traversal: ");
    //console.log(list);
    return list;
  }

  // not tested
  this.postOrder = function() {
    var list = [];
    function recur(root) {
      if (root === null) {
        return;
      }
      recur(root.left);
      recur(root.right);
      //console.log(root.value);
      list.push(root.value);
    }
    recur(this.root);
    //console.log("post-order traversal: ");
    //console.log(list);
    return list;
  }

  this.deleteValue = function(value) {
    function recur(value, root, parent, whichChild) {
      //if root is empty, do nothing
      if (root === null) {
        return false;
      }
      else if (value < root.value) { // we want to go left
        if (root.left === null) {
          return false;
        }
        else { // keep looking
          console.log("recurring left");
          return recur(value, root.left, root, 'left');
        }
      }
      else if (value > root.value) { // we want to go right
        if (root.right === null) {
          return false;
        }
        else { // keep looking
          console.log("recurring right");
          return recur(value, root.right, root, 'right');
        }
      }
      else { // value found, delete it
          console.log("deleting node " + root.value);
          
          //XXX this could cause errors if need to delete root.
          return deleteNode(root, parent, whichChild);
      }
    }
    return recur(value, this.root, null, null);
  }

  // Private Methods ///////////////////////

  // new function to delete a node (once found), return true when done
  function deleteNode(node, parent, whichChild) {
  //case 1. the node is at a leaf
    if (node.left === null && node.right === null) {
      console.log("node is leaf, setting to null");
      //node = null; // XXX this will not work!!!!
      parent[whichChild] = null; //should be OK
      return true;
    }
    //2. the (deleted) node has exactly 1 child
    else if (node.left === null) {
      console.log("attach right child of node to parent");
      parent[whichChild] = node.right;
      return true;
    }
    else if (node.right === null) {
      console.log("attach left child of node to parent");
      parent[whichChild] = node.left;
      return true;
    }
    else { // if both children are “full”
      // attach parent to node.left
      parent[whichChild] = node.left; //arbitrarily left
      appendLooseSubtree(node.left, node.right);
      return true;
    }
  }

  function appendLooseSubtree(node, looseSubtree) {
    if (node.right === null) {
      node.right = looseSubtree;
      return true;
    }    
    else {
        return appendLooseSubtree(node.right, looseSubtree);
    }
  }

  function Node(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    // it would be nice for node to have parent
    // and possiblly also which child (left or right) of the parent it is.
  }
}

// Test Cases: //////////////////////////////////////

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// Test
var t1 = new BST();
t1.addValue(8);
t1.addValue(2);
t1.addValue(3);
t1.addValue(0);
t1.addValue(10);
t1.addValue(1);
//t1.preOrder(); 
//console.log("Delete node with two children.");
t1.deleteValue(2);

//t1.preOrder(); //8, 0, 1, 3, 10
QUnit.test("delete with 2 children, preorder test", function(assert) {
  assert.deepEqual(t1.preOrder(), [8, 0, 1, 3, 10]);
});


//t1.inOrder(); //0, 1, 3, 8, 10
QUnit.test("delete with 2 children, inorder test", function(assert) {
  assert.deepEqual(t1.inOrder(), [0, 1, 3, 8, 10]);
});

//console.log(t1.preOrder());

//console.log("Delete leaf node.")
var t2 = new BST();
t2.addValue(8);
t2.addValue(2);
t2.addValue(3);
t2.addValue(0);
t2.addValue(10);
t2.addValue(1);

//console.log("Before Deletion");
//t2.inOrder(); //0, 1, 2, 3, 8
//t2.preOrder(); //8, 2, 0, 1, 3

t2.deleteValue(10);

//console.log("After Deletion");
t2.inOrder(); //0, 1, 2, 3, 8
t2.preOrder(); //8, 2, 0, 1, 3

QUnit.test("delete leaf node, inorder", function(assert) {
  assert.deepEqual(t2.inOrder(), [0, 1, 2, 3, 8]);
});

QUnit.test("delete leaf node, preorder", function(assert) {
  assert.deepEqual(t2.preOrder(), [8, 2, 0, 1, 3]);
});

//console.log("Delete node with 1 child.")
var t3 = new BST();
t3.addValue(8);
t3.addValue(2);
t3.addValue(3);
t3.addValue(10);

//console.log("Before Deletion");
//t3.inOrder(); // 2,3,8,10
//t3.preOrder(); //8,2,3,10

t3.deleteValue(2);

//console.log("After Deletion");
//t3.inOrder(); // 3,8,10
QUnit.test("delete with 1 child, inorder", function(assert) {
  assert.deepEqual(t3.inOrder(), [3, 8, 10]);
});

//t3.preOrder(); //8,3,10
QUnit.test("delete with 1 child, preorder", function(assert) {
  assert.deepEqual(t3.preOrder(), [8, 3, 10]);
});

//////////////////////////////
//document.getElementById('message').textContent = 'Script loaded.';
