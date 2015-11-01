//
document.write("Script loaded.");

//a direct graph data structure

function Graph() {
  // data /////////////////
  
  //this could arbitrary information
  this.nodes = [];
  this.edges = [];
  /////////////////////////

  // functions ////////////
  /** Add an object to the graph */
  this.addNode = function(node) {
    // these should have same indices
    // TODO: test for holes
    this.nodes.push(node);
    this.edges.push([]); 
  }

  /** Takes two node indices and adds a directed edge from the first to the
   * second . */
  this.addEdge = function(from, to) {
    // TODO: this should check if both indices are in the node-list

    //this.edges.push([from, to]);
    var edgesFromNode = this.edges[from];

    //should insert each edge in sorted order
    //using bin-search to find the insertion point
    edgesFromNode.push(to); 
    edgesFromNode.sort();
  }

  this.getNodeIndex = function(node) {
    //search node list for the value
    // if found return index
    // otherwise return false
    return undefined;
  }

  this.hasDirectPath = function(from, to) {
    //TODO: check indices

    //include new in ECMAScript 6
    //return this.nodes[from].includes(to);

    if (!(from in this.nodes)) { //?
      console.log("There is node at index " + from + ".");
      return undefined;
    }
    var edgeList = this.edges[from];
    console.log(edgeList);
    // TODO: binary search
    /*for (var i = 0; i < edgeList.length; i++) {
      if (edgeList[i] == to) { return true; }
    }*/
    return binSearch(to, edgeList).found;
  }

  this.hasPath = function(fromIndex, toIndex) {
    // possible solutions:
    // - iterative deepening
    // - A* with "general" heuristic (in/out degree)

    //iterative deepening
      //DFS with extra constraint (i.e. the depth)
    return this.dfs(fromIndex, toIndex);
  }

  // depth first search
  // recursively...
  this.DepthFirstIndexSearch = function(rootIndex, keyIndex) {
    var space = edges[rootIndex];
    for (var i = 0; i < )
  }
}

// iterative version
function binSearch(key, array) {
  var min = 0;
  var max = array.length - 1;
  while (min <= max) {
    console.log("Looking between indices " + min + " and " + max + "...")
    
    var pivot = min + Math.floor((max - min) / 2);
    if (array[pivot] == key) { return {found: true, index: pivot}; }
    else if (array[pivot] < key) { min = pivot + 1; }
    else { max = pivot - 1; }
  }
  return {found: false};
}

function binSearchR(key, array) {
  return recurBinSearch(key, 0, array.length - 1, array);
}

function recurBinSearch(key, min, max, array) {
    console.log("Looking between indices " + min + " and " + max + "...")

    /*
      |=====================| max
      |=================....| min
      |====.................| (max - min)
      |==...................| (max - min) / 2:
      |===================..| (max - min) / 2 + min
      
      0..10 5
      (10 - 0) / 2
      100..110 105
      110 - 100 -> 10 / 2 -> 5
      110 + 100 -> 210 / 2  -> 105
    */
    // slower but more intuitive.
    var pivot = min + Math.floor((max - min) / 2);
    //var pivot = Math.floor((min + max)/2);

    // tail-recursive version
    if (key == array[pivot]) {
      return {found: true, index: pivot};
    }
    else {
      var newMin = min;
      var newMax = max;
      if (array[pivot] < key) { newMin = pivot + 1; }
      else { newMax = pivot - 1; }
      
      // this ensures that we won't get an out-of-bounds error when we inc/dec
      // the min or maximum.
      if (newMin > newMax) {
        return {found: false};
      }
      else {
        return recurBinSearch(key, newMin, newMax, array);
      }
    }
    //return false;
    // TODO: make iterative!

    /* Original 
    else if (key > array[pivot]) {
      return recurBinSearch(key, pivot, max, array); 
      //or min <- pivot + 1, but risk OOB exception
    }
    else { //(key < array[pivot]) {
      return recurBinSearch(key, min, pivot, array);
      //maybe max <- pivot - 1 ...
    }
    */
  /* What if not in array ???? */
}

/* this.isPath */ //continue

/*
 n []
 e []

 ni [0]
 e [[]]

if n[i] is a node in the graph
  then e[i] = an array of all edges starting from n[0]
*/

g = new Graph();

g.addNode("hello");
g.addNode("goodbye");
g.addNode(42);

g.addEdge(0,1);
g.addEdge(2,0);
g.addEdge(0,0);

