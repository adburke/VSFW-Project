// Activity 2
// VFW 1208
// Aaron Burke

window.addEventListener("DOMContentLoaded", function(){

	// getElementById function shortcut
	function $(selector){
		var element = document.getElementById(selector);
		return element;
	}
	
	// Create select field element and populate with options
	function formLists(selector, array){
		var formtTag = document.getElementsByTagName("form"),
			selectLi = $(selector),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=array.length; i<j; i++){
			var makeOption = document.createElement("option");
			var opText = array[i];
			makeOption.setAttribute("value", opText);
			makeOption.innerHTML = opText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	// Increment the Job # everytime we save a Job
	function jobNum(){
		jobNumCount++;
	}
	// Check to see what radio button is selected
	function getSelectedRadio(){
		var radios = document.forms[0].rush;
		for (var i =0; i < radios.length; i++){
			if (radios[i].checked){
				rushValue = radios[i].value;
			}
		}
	}

	function saveData(){
		// Random key number for each job object
		var id = Math.floor(Math.random()*10000001);
		getSelectedRadio();
		// Get all of the form data and create an object out of it
		var jobFormData = {};
			jobFormData.jobNum		= ["Job Num", jobNumCount];
			jobFormData.company		= ["Company", $("company").value];
			jobFormData.address		= ["Address", $("address").value];
			jobFormData.city		= ["City", $("city").value];
			jobFormData.state		= ["State", $("state").value];
			jobFormData.zipcode		= ["Zipcode", $("zipcode").value];
			jobFormData.phone		= ["Phone", $("phone").value];
			jobFormData.email		= ["Email", $("email").value];
			jobFormData.oDate		= ["Order Date", $("orderdate").value];
			jobFormData.needDate	= ["Need Date", $("needbydate").value];
			jobFormData.rushOrder	= ["Rush Order", rushValue];
			jobFormData.jobType		= ["Job Type", $("groups").value];
			jobFormData.customInfo	= ["Custom Info", $("custom").value];
			jobFormData.quantity	= ["Quantity", $("qty").value];
			jobFormData.prodHours	= ["Production Hours", $("production").value];
			jobFormData.designEff	= ["Design Effort", $("design").value];

		localStorage.setItem(id, JSON.stringify(jobFormData));
		jobNum();
		alert("Job Saved");
	}

	// Variable defaults
	var jobTypes = ["--Job Types--", "Banner", "Decal", "Sign", "Custom"];
	var jobNumCount = 1000;
	var rushValue;
	// Calls the function to create the select box and populates with job types
	formLists("jobTypes", jobTypes);
	// Gives a value to our readonly Job # field to start with
	document.forms[0]["jobnum"].value = jobNumCount;

	// Set Link $ Submit Click Events
	// var displayData = $("displayData");
	// displayData.addEventListener("click", getData);
	// var clearData = $("clearData");
	// clearData.addEventListener("click", clearData);
	var save = $("submit");
	save.addEventListener("click", saveData);
});