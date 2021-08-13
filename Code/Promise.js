module.exports = Promise;

function Promise(func) {
    // closure variables 
    var state = 'pending';
    var deferred = null;
    var value;

    function resolve(newValue) {
        try {
            if (newValue && typeof newValue.then === 'function') {
                newValue.then(resolve, reject);
                return;
            }
            state = 'resolved';
            value = newValue;

            if (deferred) {
                handle(deferred);
            }
        } catch (err) {
            reject(err);
        }
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        if (deferred) {
            handle(deferred);
        }
    }

    function handle(handler) {
       
        if (state === 'pending') {
            deferred = handler;
            return;
        }

        setTimeout(function () {
            var handlerCb;

            if (state === 'resolved') {
                handlerCb = handler.onResolved;
            }
            else if (state === 'rejected') {
                handlerCb = handler.onRejected;
            }

            if (handlerCb) {
                var returnValueOrReason;
                try {
                    returnValueOrReason = handlerCb(value);
                } catch (err) {
                    handler.reject(err);
                    return;
                }

                if (state === 'resolved') {
                    handler.resolve(returnValueOrReason);
                }
                else if (state === 'rejected') {
                    handler.reject(returnValueOrReason);
                }
            }

            if (!handlerCb) {
                state === 'resolved' ? handler.resolve(value) : handler.reject(value);
                return;
            }
        }, 1);
    }

    this.then = function (onResolved, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onResolved: onResolved,
                onRejected: onRejected,
                reject: reject,
                resolve: resolve
            });
        });
    }

    func(resolve, reject);
}

test()
    .then(function (res) {
        console.log(res)
    }, function (rej) {
        console.log(rej)
    })


function test() {
    let promise = new Promise((res, rej) => {
        console.log('I am here!!!');
        setTimeout(() => { res('test') }, 0);
        console.log('Even I will print!!!', typeof res);
    });
    return promise;
}
console.log('Hey there');