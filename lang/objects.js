/*
look into:
  prototypes: done.
  call
  apply
  bind
  Object.create
*/

//----
function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");

//prototypes
Rabbit.prototype.speak = function(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
}
//-----

blackRabbit.speak("Hello");

// USAGE NOTE:
// use constructor for things that are usually different, prototype can contain  things that are usually the same


