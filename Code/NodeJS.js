//************ Express *************
let express = require("express");
let app = express();

let obj = {};
// console.log(obj.toString()) // prototype object
let temp = Object.create(null);
// console.log(temp.toString()) // will throw an error

//extended: true => qs library => prototype => Object => Access to methods toString()
//extended: false => query-string library => prototype => Null
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json()); // will return req.body in JSON object

app.get("/data", (req, res) => {
  console.log("Hey getting", req.body);
  // res.cookie('name', 'tobi')
  // res.download('./data.js')
  res.header("type", true);
  res.status(200).send("800000000000000.");
  // res.send('Hey getting')
});

app.listen(8000, "127.0.0.1", () => {
  console.log("Listening to port 8000");
});


//**************** Very Important Control flow of Event Loop *********************
function step(iteration) {
  if (iteration === 2) return;
  setImmediate(() => {
    console.log(`setImmediate iteration: ${iteration}`);
    step(iteration + 1); // Recursive call from setImmediate handler.
  });
  console.log('Hey i m called!!!')
  process.nextTick(() => {
    console.log(`nextTick iteration: ${iteration}`);
    step(iteration + 1); // Recursive call from setImmediate handler.
  });
}

step(0);



// *********************** Promises vs async await => (promises in pending state) & (await in fulfilled/reject) ********************************
const app = () => {
  return Promise.reject('I will Break').then().catch(err => console.log('err:: ', err));
};
const getApplicationFeatureConfig = async () => {
  let AppFeatConfError = await app();
  console.log('Await AppFeatConfError:: ', AppFeatConfError);
};
getApplicationFeatureConfig()
  .then(data => console.log('data:: ', data))
  .catch(err => console.log('Await err:: ', err));
const getApplicationFeatureConfigs = () => {
    return new Promise((resolve, reject) => {
      let AppFeatConfError = app();
      console.log('Promise AppFeatConfError:: ', AppFeatConfError);

      if (AppFeatConfError) {
        console.log('Promise I m in IF......................');
        return reject({
          success: false,
          msg: 'Promise Error in fetching Application Feature Config',
          data: [],
        });
      }
    });
  };
getApplicationFeatureConfigs()
  .then(data => console.log('data:: ', data))
  .catch(err => console.log('Promise err:: ', err));

    
// **************** new Promise vs Async *******************************

const request  = require('request')

const safePromise = promise => promise.then(data => ([null, data])).catch(err => ([err]));

const loginUserWithPromise = () => {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'http://localhost:5000/'
    }, function (error, res, body) {
      console.log('reached', body);
      if (error) {
        console.log('error in users/login coreApi.post');
        console.log(error);
        return reject(error);
      } else {
        console.log('body>>>', body);
        if (body && body.success)
          return resolve(body);
        else {
          console.log('reject');
          return reject(body)
        }
      }
    })
  })
};

/* loginUserWithPromise().then(res => {
    console.log('res---------', res)
    return res;
  }).catch(err => {
    console.log('Error', err);
  }); */

const loginUserWithAsync = async () => {
  try {
      // return request({ <-- Main function should return
      request({
        url: 'http://localhost:5000/'
      }, function (error, res, body) {
        console.log('reached', body);
        if (error) {
          console.log('error in users/login coreApi.post');
          console.log(error);
          return reject(error);
        } else {
          console.log('body>>>', body);
          if (body && body.success)
            return resolve(body);
          else {
            console.log('reject');
            Promise.reject(body).catch(err => {
              console.log('errr----------', err);
              return err;
            });
          }
        }
      })
  } catch (e) {
    console.log('catchError', e);
    return reject({
      success: true
    });
  }
};

loginUserWithAsync().then(res => {
  console.log('res---------', res)
  return res;
}).catch(err => {
  console.log('Error', err);
});