/*
 * Linked List
 */

//constructor (2):
exports.Node = function (value, next) {
  this.value = value;
  this.next = next;
}

//var head = new Node(3, null);

exports.List = function () {
  this.head = null;
  //this.size = 0;
  // list all functions
  this.add = null; //TODO

  this.tail = function () {
    var current = this.head; //?

    //need to avoid error on accessing current.next
    if (current == null) {
      return null;
    }
    else while (true) { //bad design...
      if (current.next == null ) {
        return current;
      }
      else { current = current.next; }
    }
  }

  this.append = function (node) { //pass by value?
    //need to deal with case of empty list
    if (this.head == null) {
      this.head = node;
    }
    else { //NOT WORKING
      node.next = this.head.next;
      //maybe only literals are mutable... not references?
      //.... or that it's in a module???

      this.head = node;
    }
  }

  //try this instead:
  // what if we WANT the side effects???
  /*
  this.append = function (node) { //pass by value?
    var new_node = new Node(node.value, null);
    new_node.next = this.head.next;
    this.head = node;
  }
  */

  this.print = function () {
    var array = [];
    var current = this.head;
    if (current == null) {
      return "";
    }
    else while (true) {
      if (current.next == null ) {
        array.push(current.value);
        return array.toString(); //use default Array method
      }
      else {
        array.push(current.value);
        current = current.next;
      }
    }
  };
}

//mb. rename to this.prototype.toString(..)
  //or ... just toString should override
//exports.print =
// moving into List

//this is wrong... maybe
/*
var li = new List();
var c = new Node(3, null);
var b = new Node(2, c);
var a = new Node(1, b);
li.head = a;

var l2 = new List(3, null);

var n1 = new Node(1, null);
var n2 = new Node(2, null);
var n3 = new Node(3, null);

l2.head = n1;
n1.next = n2;
n2.next = n3;
*/
