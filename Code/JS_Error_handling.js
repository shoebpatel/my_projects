"use strict";
function normal1() {
    console.log('Error in normal1');
    someNumber.replace("-","");
}
function normal2() {
    try {
        throw new TypeError('Error in normal2');
    } catch (err) {
        console.log('In normal2 catch');
        throw (err);
    }
}
function normal3() {
    try {
        throw new SyntaxError('Error in normal3');
    } catch (err) {
        console.log('In normal3 catch');
        throw (err);
    }
}
async function async1() {
    try {
        throw new ReferenceError('Error in async1');
    } catch (err) {
        console.log('In normal async1');
        throw (err);
    }
}
async function async2() {
    console.log('Error in async2');
    someNumber.replace("-","");
}
function promise() {
    return new Promise((res, rej) => {
        return rej('Error in promise');
    })
}
function main() {
    // * Prefer function normal1() bcoz !try{} catch{} should be handled where the function is called.

    // * error handling in normal1 function
    try {
        // normal1();
    } catch (err) {
        console.log('Normal1 Function:: ', err);
        return err;
    }

    // * error handling in normal2 function
    try {
        // normal2();
    } catch (err) {
        console.log('Normal2 Function:: ', err);
        return err;
    }

    // * error handling in normal3 function
    // * the code will break here, bcoz error not handled with try catch in normal3()
    // normal3();

    // * error handling in async1 function 
    // * Even return from catch will come in .then()
    // async1().then(res => {
    //     console.log('Even return from catch will come here');
    // }).catch(err => {
    //     console.log('async1 Function:: ', err);
    //     return err;
    // })

    // // * error handling in async2 function 
    // async2().then(res => {
    //     console.log('Even return from catch will come here');
    // }).catch(err => {
    //     console.log('async2 Function:: ', err);
    //     return err;
    // })

    // * error handling in promise function 
    promise().then(res => {
        console.log('resolve will come here');
    },err => {
        console.log('rejected promises are handled by 2nd argument of .then() method:: ', err);
        return err;
    })
    .catch(err => {
        console.log(`catch method is used when 2nd argument is not present in .then() method 
                     & while chaining multiple.then() method if 2nd argument is not present then, catch will handle the rejected promise:: `, err);
        return err;
    })
}

main();