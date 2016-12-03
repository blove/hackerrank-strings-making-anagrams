//global variables
let a = "";
let b = "";

//read standard input
process.stdin.setEncoding("utf8");
process.stdin.resume();

//store input
let input = "";
process.stdin.on("data", function(data) {
  input += data;
});
process.stdin.on("end", function() {
  let linesOfInput = input.split("\n");
  a = linesOfInput[0];
  b = linesOfInput[1];
  main();
});

//let's do it
function main() {
  //verify values
  if (String(a) !== a || String(b) !== b || a.length === 0 || b.length === 0) {
    throw Error("The input values are invalid.");
  }

  //get result
  //let result = getDeleteCountUsingIndexOf();
  let result = getDeleteCountUsingDestructive();

  //output
  process.stdout.write(result.toString());
}

function getDeleteCountUsingIndexOf() {
  var aChars = a.split("");
  var bChars = b.split("");

  if (aChars.length > bChars.length) {
    var outer = aChars;
    var inner = bChars;
  } else {
    var outer = bChars;
    var inner = aChars;
  }

  var outerIndex = outer.length-1;
  while (inner.length > 0 && outer.length > 0 && outerIndex >= 0) {
    let innerIndex = inner.indexOf(outer[outerIndex]);
    if (innerIndex !== -1) {
      outer.splice(outerIndex, 1);
      inner.splice(innerIndex, 1);
    }
    --outerIndex;
  }

  return outer.length + inner.length;
}

function getDeleteCountUsingDestructive() {
  let aChars = getSortedArrayofChars(a);
  let bChars = getSortedArrayofChars(b);

  var letters = [];
  while (aChars.length > 0 || bChars.length > 0) {
    //check if aChars array is empty
    if (aChars.length === 0) {
      letters.push(bChars.shift());
      continue;
    }

    //check if bChars array is empty
    if (bChars[0] === undefined) {
      letters.push(aChars.shift());
      continue;
    }

    //shift first element based on ascii comparison
    if (aChars[0] < bChars[0]) {
      letters.push(aChars.shift());
    } else if (aChars[0] > bChars[0]) {
      letters.push(bChars.shift());
    } else {
      aChars.shift();
      bChars.shift();
    }
  }

  return letters.length;
}

function getSortedArrayofChars(str) {
  //get the array of characters using array.split()
  let arrayOfChars = str.split("");

  //sort the array alphabetically
  let alphabetically = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }
  return arrayOfChars.sort(alphabetically);
}