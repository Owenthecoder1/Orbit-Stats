
AWS.config.region = "us-east-2"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:dfa6a488-99e1-4718-9e35-cb953bed3709"})
var saveInProgress

function confunc(){
	var name = document.getElementById("name").value
	if(name == ""){
		alert("Fail:nothing here")
	}else{
		pushDynamo(name)
	}
}
function pushDynamo (name){
	if(saveInProgress){
		return
	}
	saveInProgress = true
	var db = new AWS.DynamoDB({region:"us-east-2"})
	db.config.credentials = AWS.config.credentials

	var params = {
		TableName: "Student-data",
		Item: {
			registration_date: {S: (new Date().getTime()).toString()},
			id: {S: uuidv4()},
			name: {S: name},
			test1Score: {S: "Not Taken"},
			test2Score: {S: "Not Taken"},
			FinalExamScore: {S: "Not Taken"},
			Status: {S: "Student"},
		},
	}
	console.log(db)
	db.putItem(params, function(e,r){
		if(e){
			console.log(e)
			alert("Error")
		} else {
			alert("Student Created!")
		window.location.href="index.html"
		}
	})
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
var con = document.getElementById("con")
con.addEventListener("click",confunc)

