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
	// Increment or set the Job #
	function jobCount(){
		if (localStorage.getItem("jobNumber")){
			jobNumCount = localStorage["jobNumber"];
			document.forms[0]["jobnum"].value = Number(jobNumCount);
		} else {
			jobNumCount = 1000;
			localStorage.setItem("jobNumber", jobNumCount.toString());
			document.forms[0]["jobnum"].value = jobNumCount;
		}
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
	// Save data to localstorage
	function saveData(){
		// Random key number for each job object
		var id = jobNumCount;
		// Get Radio button status
		getSelectedRadio();
		// Get all of the form data and create an object out of it
		var jobFormData				= {};
			jobFormData.jobNum		= ["Job Num", $("jobnum").value];
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
		var num = Number($("jobnum").value)+1;
		localStorage["jobNumber"] = num.toString();
		alert("Job #: " + jobNumCount + " Saved");

	}
	// Retrieve and display data from localstorage
	function getData(){
		if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
			alert("Local Storage does not contain any jobs.");
			return;
		}
		toggleControl("on");
		makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		for(var i = 0, j = localStorage.length; i < j; i++){
			// New safari adds extra garbage to localstorage this lets only our keys of numbers make it to the display
			if(Number(localStorage.key(i))/1 === Number(localStorage.key(i))){
				var makeLi = document.createElement("li");
				makeList.appendChild(makeLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var object = JSON.parse(value);
				var makeSubList = document.createElement("ul");
				makeLi.appendChild(makeSubList);
				for(var x in object){
					var makeSubLi = document.createElement("li");
					makeSubList.appendChild(makeSubLi);
					var objText = object[x][0]+ ": "+object[x][1];
					makeSubLi.innerHTML = objText;
				}
			}
		}
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
	}
	// Clears local storage and resets the job #
	function clearData(){
		if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
			alert("Local Storage does not contain any jobs.");
			return;
		}
		localStorage.clear();
		alert("All jobs deleted from local storage.");
		jobCount();
		window.location.reload();
	}
	// Toggle form off and on to show Stored data in its place
	function toggleControl(state){
		switch(state){
			case "on":
				$("jobForm").style.display = "none";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "none";
				$("newJob").style.display = "inline";
				break;

			case "off":
				$("jobForm").style.display = "block";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "inline";
				$("newJob").style.display = "none";
				$("items").style.display = "none";
				break;

			default:
				return false;
		}
	}
	// Validate that all required form fields at least have a value *no error checking yet*
	function validation(){
		var elements = document.getElementsByTagName("input");
		console.log(elements);
		for (var i =0, j = elements.length; i < j; i++){
			if (elements[i].required && elements[i].value === ""){
				console.log("Required Missing");
				console.log(elements[i]);
				alert("Required Fields Missing");
				return;
			}
		}
		saveData();
	}

	// Variable defaults
	var jobTypes = ["--Job Types--", "Banner", "Decal", "Sign", "Custom"];
	var jobNumCount;
	var rushValue;
	// Calls the function to create the select box and populates with job types
	formLists("jobTypes", jobTypes);
	// Function called to set or check Job # read only field value
	jobCount();
	// Set Link $ Submit Click Events
	var displayData = $("displayData");
	displayData.addEventListener("click", getData);
	var clearStorage = $("clearData");
	clearStorage.addEventListener("click", clearData);
	var save = $("submit");
	save.addEventListener("click", validation);
});