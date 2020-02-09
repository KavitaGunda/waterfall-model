
# waterfall-model
 Build a waterfall function (using ES5), which:
 1. Takes 2 arguments
     a. An array of asynchronous functions
     b. A final callback function
 2. Executes the array of functions sequentially
 3. Pass the result of one function to the next, and so on
 4. Pass the result of last function to the final callback function
 5. If an error occurs during any of the function’s execution, directly jump to the final callback function, with the error parameter.

     function waterfall(arr, finalCallback) {
      // Write your code here
      ......
      
      /*
      // For example: like the below code: this only works for finite array length of 3  
       let firstCallback = arr[0];
       let secondCallback = arr[1];
       let thirdCallback = arr[2];
       firstCallback(function(err, param) {
         secondCallback(param, function(err, param1, param2) {
           thirdCallback(param1, param2, function(err, data) {
             finalCallback(err, data);
           });
         });
       });
      */
    }
    waterfall(
      [
        function(callback) {
          setTimeout(function() {
            console.log("FIRST");
            callback(null, "b");
          }, 100);
        },
        function(param, callback) {
          setTimeout(function() {
            console.log("SECOND", param);
            callback(null, "c", "d");
          }, 50);
        },
        function(param1, param2, callback) {
          setTimeout(function() {
            console.log("THIRD", param1, param2);
            callback(null, "e");
          }, 10);
        }
      ],
      function(err, result) {
          Console.log('The last callback...!');
        console.log("err", err);
        console.log("result", result);
      }
    );

 **Output:**

     FIRST
     SECOND b
     THIRD c d
     err null
     result e



