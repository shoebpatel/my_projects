//************** this in Javascript *******************

let std_obj = function () {
  console.log("Global:: ",this);
  let obj = {
    displayMe: function () {
      console.log("Object:: ",this);

      let out1 = () => {
        console.log("immediate function's this::",this); 

        let doSomeEffects = function () {
          console.log("Global:: ",this)
        }
        return doSomeEffects;
      }
      return out1;
    }
  }
  return obj
}

let obj = std_obj() // * this reference to global

let out1 = obj.displayMe() // * this reference to obj object

let doSomeEffects = out1() // * this reference to immediate function's this

doSomeEffects() // * this reference to global


let name = {
  firstName: "Name",
  f: function () {
    console.log('this in name:: ', this);
  }
}

let temp1 = name.f();// * this reference to name object

let temp2 = name.f;
temp2() // * here "this" reference to the global and not to the obj (remember no closures)

//******************* Starvation of the callback queue by the micro task queue *******************/
var done = false;
var counter = 0;

function makePromise() {
    if (counter < 5) {
        counter++;
        return new Promise(function c(resolve) {
            setTimeout(resolve, 0);
        });
    } else return Promise.resolve();
}

async function a() {
    let i = 1;
    while (!done) {
      await makePromise();
        console.log(`a: ${i++}`);
        if (i >= 6) done = true;
    }
}

async function b() {
    let i = 1;
    while (!done) {
        await makePromise();
        console.log(`b: ${i++}`);
        if (i >= 6) done = true;
    }
}

a();
b();

console.log('Hey there');

// * callback queue
// * s-a1, s-b1, s-a2, s-b2, s-a3

// * microtask queue
// * b3, b4, b5
// *         ↑





