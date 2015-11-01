//map, filter, and reduce
function (str) {
  var hash = {};
  var list = str.split("")
  var newlist = list.filter(
    function(current, index, arr) {
      if (!(current in hash)) {
        hash[current] = current;
        return true;
      }
      return false;
    });
  return newlist.join("");
}
