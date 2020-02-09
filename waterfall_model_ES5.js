function waterfall(arr, finalCallback) {
    //Recursive inner function to call the nested callback functions
    let reF = function(funcArgs, index, actualArray) {
        //Handles the array functions length
        if (index <= (actualArray.length - 1)) {
            try{
                if (funcArgs && funcArgs.length) {
                    //calls the inner nested function which takes the previous function arguments
                    actualArray[index](...funcArgs, function () {
                        //callback's arguments object is read to pass on arguments to a array functions
                        var arg = Array.from(arguments);
                        var err = arg[0];
                        var params = arg.slice(1);
                        if (err || (index === actualArray.length - 1)) {
                            //In case of error finalCallback is called with an error
                            finalCallback(err, ...params);
                        } else {
                            //recursive function called
                            return reF(params, index + 1, actualArray);
                        }
                    });
                } else {
                    //calls the inner nested function which does not take previous function arguments
                    actualArray[index](function () {
                        //callback's arguments object is read to pass on arguments to a array functions
                        var arg = Array.from(arguments);
                        var err = arg[0];
                        var params = arg.slice(1);
                        if (err) {
                            //In case of error finalCallback is called with an error
                            finalCallback(err, ...params);
                        }else{
                            //recursive function called
                            return reF(params, index + 1, actualArray);
                        }
                    });
                }
            }catch(e){
                //In case of any sort of exception finalCallback is called with an error
                finalCallback(e, null);
            }
        }else{
            //In case of ArrayIndexOutOfBounds exception finalCallback is called with an error
            finalCallback(new Error('Array index out of bounds exception.'), null);
        }
    }
    //Call to a recursive function
    reF(undefined, 0, arr);
}
waterfall(
    [
        function (callback) {
            setTimeout(function () {
                console.log("FIRST");
                callback(null, "b");
            }, 100);
        },
        function (param, callback) {
            setTimeout(function () {
                console.log("SECOND", param);
                callback(null, "c", "d");
            }, 50);
        },
        function (param1, param2, callback) {
            setTimeout(function () {
                console.log("THIRD", param1, param2);
                callback(null, "e");
            }, 10);
        }
    ],
    function (err, result) {
        console.log("err", err);
        console.log("result", result);
    }
);

