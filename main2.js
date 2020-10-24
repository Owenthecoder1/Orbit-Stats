AWS.config.region = "us-east-2"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:dfa6a488-99e1-4718-9e35-cb953bed3709"})

function list_students(dateMin, callback){
	var params = {
	  "ExpressionAttributeValues": {
	    ":value1": {S: (new Date(dateMin)).getTime().toString()},

	  },
	  "Limit": 100,
	  "FilterExpression":"#name1 > :value1",
	  "TableName": "Student-data",
	  "ExpressionAttributeNames": {
	    "#name1": "registration_date"
	  }
	}

	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials


	var res = [];
	var temp = function(err, data){
	  if(err){
	    console.log('db error', err)
	    console.log(err.stack);
	    alert('Error');
	  } else {
	    res = res.concat(data.Items);
	    if(data.LastEvaluatedKey){
	      params.ExclusiveStartKey = data.LastEvaluatedKey
	      db.query(params, temp)
	    } else {
	      callback(res)
	    }
	  }
	};
	db.scan(params, temp)
};
function com (students){
	var x = document.getElementById("studentList")
	for (var s of students){
		var y =	document.createElement("li")
		var z = document.createElement("a")
		x.appendChild(y)
		y.appendChild(z)
		z.textContent = s.name.S
		z.href = "viewstudent.html?id=" + s.id.S
	}
}
list_students("2020-01-01",com)