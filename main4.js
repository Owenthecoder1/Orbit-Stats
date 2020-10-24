AWS.config.region = "us-east-2"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:dfa6a488-99e1-4718-9e35-cb953bed3709"})

var url = window.location.href
var array = url.split("q=")
var id = array[1]

function updateStudent(id, callback){
	var params = {
		 "TableName": "Student-data",
		 "Key": {"id": {"S": id}},
		 UpdateExpression: "set #test1Score = :t1s, #test2Score = :t2s, #FinalExamScore= :fes, #Status= :sta", 
		 ExpressionAttributeNames:{
		 	"#test1Score": "test1Score",
		 	"#test2Score": "test2Score",
		 	"#FinalExamScore": "FinalExamScore",
		 	"#Status": "Status"
		 },
   		 ExpressionAttributeValues:{
	        ":t1s": {S: document.getElementById("t1s").value},
	        ":t2s": {S: document.getElementById("t2s").value},
	        ":fes": {S: document.getElementById("fes").value},
	        ":sta": {S: document.getElementById("sta").value},
	    },
	}
	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials
	db.updateItem(params,function(err,data){
		if(err){
			console.log(err)
			alert("Error, check console!")
		} else {
			callback(data.Item)
		}
	})
}

function updateSuccess(){
	alert("Student updated")
}

function getStudent(id, callback){
	var params = {
		 "TableName": "Student-data",
		 "Key": {"id": {"S": id}}
	}
	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials
	db.getItem(params,function(err,data){
		if(err){
			alert(err)
		} else {
			callback(data.Item)
		}
	})
}

function deleteStudent(id){
	var params = {
		 "TableName": "Student-data",
		 "Key": {"id": {"S": id}}
	}
	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials
	db.deleteItem(params,function(err,data){
		if(err){
			alert(err)
		} else {
			alert("Student Deleted!");
			window.location.href = "index.html"
		}
	})
}

function displayStudent (studentdata){
	document.getElementById("t1s").value = studentdata.test1Score.S
	document.getElementById("t2s").value= studentdata.test2Score.S
	document.getElementById("fes").value= studentdata.FinalExamScore.S
	document.getElementById("sta").value= studentdata.Status.S
}

var confirm_button = document.getElementById("change-data")
confirm_button.addEventListener("click", function(){
	updateStudent(id, updateSuccess)
})

var delete_button = document.getElementById("deletebutton")
delete_button.addEventListener("click", function(){
	var a = prompt("Are you sure? Type 'Yes, I am sure.' and then click confirm to delete this student.")
	if(a == "Yes, I am sure."){
		deleteStudent(id)
	}else{
		alert("Delete Canceled")
	}
})

getStudent(id,displayStudent)