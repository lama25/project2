var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'ProductCatalog',
  Item: {
    'Id' : {N: '005'}
    //'CUSTOMER_NAME' : {S: 'Richard Roe'}
  }
};

// // Call DynamoDB to add the item to the table
// ddb.putItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

const params2 = {
  // Specify which items in the results are returned.
  FilterExpression: "Id > :s AND Id < :e",
  // Define the expression attribute value, which are substitutes for the values you want to compare.
  ExpressionAttributeValues: {
    ":s": {N: '0'},
    ":e": {N: '100'}
  },
  // Set the projection expression, which are the attributes that you want.
  ProjectionExpression: "Id",
  TableName: "ProductCatalog",
};

ddb.scan(params2, function (err, data) {
  if (err) {
    console.log("Error", err);
    response.end("error\n");

  } else {
    console.log("Success", data);
    var ids = "";
    data.Items.forEach(function (element, index, array) {
      ids += " " + element.Id['N'];
      console.log(
          "printing",
          element.Id
      );

      console.log("asdasd " + ids);
    });
    response.end("Hello World\n" + ids + "\n");

  }
});
