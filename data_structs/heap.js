var heap = {
  root: null;
}

function Node() {
  this.root = null;
  this.left = null;
  this.right = null;
}

function Heap() {
  this.root = null;
  this.insert function(node) {
    function recur(node, root) {
      
      if (root.left === null) {
        root.left = node;
        return true;
      }
      else if (root.right === null) {
        root.right = node;
        return true;
      }
      else {
        return recur(node, root.left);
      }
    }
    return recur(node, this.root)
  }
}
