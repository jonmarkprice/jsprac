/*
 * Linked List
 */

function Node(value, next) {
  this.value = value;
  this.next = next;
}

function List() {
  this.head = null;
  //this.size = 0;
}

List.prototype.tail = function () {
  var current = this.head;
  //need to avoid error on accessing current.next
  if (current == null) { return null; }
  while (current.next != null ) {
    current = current.next;
  }
  return current;
}

List.prototype.tail2 = function () {
  //tail recursion
  if (this.head == null) {
    return null;
  }
  return this.tailR(this.head);
}

//functions
List.prototype.tail0 = function () {
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

//helper function
List.prototype.tailR = function (node) {
  if (node.next == null) {
    return node;
  }
  else {
    return this.tailR(node.next);
  }
}

List.prototype.tail3 = function () {
  //tail recursion
  if (this.head == null) {
    return null;
  }
  function recur(node) {
    if (node.next == null) {
      return node;
    }
    else {
      return this.recur(node.next);
    }
  }
  return this.recur(this.head);
}


List.prototype.append = function (node) { //pass by value?
  //need to deal with case of empty list
  if (this.head == null) {
    this.head = node;
  }
  else {
    node.next = this.head;
    this.head = node;
  }
}

List.prototype.print = function () {
  var array = [];
  var current = this.head;
  if (current == null) {
    return "[empty]";
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
}


//mb. rename to this.prototype.toString(..)
  //or ... just toString should override
//exports.print =
// moving into List
//this is wrong... maybe

var li = new List();
var c = new Node(3, null);
var b = new Node(2, c);
var a = new Node(1, b);
li.head = a;
li.print();

/*
var l2 = new List(3, null);
var n1 = new Node(1, null);
var n2 = new Node(2, null);
var n3 = new Node(3, null);
l2.head = n1;
n1.next = n2;
n2.next = n3;
*/

