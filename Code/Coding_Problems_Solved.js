/* Calculating Levenshtein Distance */
var levenshtein = function (str1, str2) {
    console.log("🚀 ~ file: test.js ~ line 2 ~ levenshtein ~ str1", str1);
    console.log("🚀 ~ file: test.js ~ line 3 ~ levenshtein ~ str2", str2);
    var current = [],
        prev, value;

    for (var i = 0; i <= str2.length; i++) // mi
    {
        for (var j = 0; j <= str1.length; j++) { //  mis
            if (i && j) {
                if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
                    value = prev;
                } else {
                    value = Math.min(current[j], current[j - 1], prev) + 1;
                }
            } else {
                value = i + j;
            }
            prev = current[j];
            current[j] = value;
        }
    }
    return current.pop();
};

levenshtein('mis', 'mi');


/********** Temperature
//       0   1   2   3   4   5   6   7   8   9
let T = [80, 73, 74, 75, 71, 69, 72, 76, 73, 78]
let res = new Array(T.length).fill(0)
let stack = []
for (let i = 0; i < T.length; i++) {
  while (T[stack[stack.length - 1]] < T[i]) { // T[stack[stack.length - 1]] this will remove the latest value from the stack.
    let index = stack.pop()
    res[index] = i - index
  }
  stack.push(i)
}
console.log("res::>>>> ", res)*/


/*********** X print
let square = 5
for (let i = 0; i < square; i++) { 
    for (let j = 0; j < square; j++) {
        if(i === j || i === square - 1 - j)          
            process.stdout.write("*")      
        else
        process.stdout.write(" ")
    }
    console.log(" ")
}*/

/************ Recursion
let main = () => {
    let h = 4;
    draw(h);
}

function draw(h) {
    if (h === 0) {
        return;
    }
    draw(h - 1)

    for (let i = 0; i < h; i++) {
        process.stdout.write('*')
    }
    process.stdout.write('\n')
}
main()*/