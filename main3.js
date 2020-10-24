AWS.config.region = "us-east-2"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:dfa6a488-99e1-4718-9e35-cb953bed3709"})

var url = window.location.href
var array = url.split("id=")
var id = array[1]

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

function displayStudent (studentdata){
	document.getElementById("t1s").textContent = "Test 1 Score: " + studentdata.test1Score.S
	document.getElementById("t2s").textContent = "Test 2 Score: " + studentdata.test2Score.S
	document.getElementById("fes").textContent = "Final Exam Score: " + studentdata.FinalExamScore.S
	document.getElementById("sta").textContent = "Status: " + studentdata.Status.S
}

function showStudent(studentData){
	var edit_button = document.getElementById("editdata")
	var title = document.createElement("h1")
	title.textContent = studentData.name.S + "'s Data"
	document.getElementById("title").appendChild(title)
	edit_button.href = "editstudentdata.html?q=" + studentData.id.S
	displayStudent(studentData)
}

getStudent(id, showStudent)
