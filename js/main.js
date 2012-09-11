// Activity 2
// VFW 1208
// Aaron Burke

window.addEventListener("DOMContentLoaded", function(){

	// getElementById function shortcut
	function $(selector){
		var element = document.getElementById(selector);
		return element;
	};
	
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
		};
		selectLi.appendChild(makeSelect);
	};
	// Increment or set the Job #
	function jobCount(){
		if (localStorage.getItem("jobNumber")){
			jobNumCount = localStorage["jobNumber"];
			document.forms[0]["jobnum"].value = Number(jobNumCount);
		} else {
			jobNumCount = 1000;
			localStorage.setItem("jobNumber", jobNumCount.toString());
			document.forms[0]["jobnum"].value = jobNumCount;
		};
	};
	// Check to see what radio button is selected
	function getSelectedRadio(){
		var radios = document.forms[0].rush;
		for (var i =0; i < radios.length; i++){
			if (radios[i].checked){
				rushValue = radios[i].value;
			};
		;}
	};
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

	};
	// Retrieve and display data from localstorage
	function getData(){
		if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
			alert("Local Storage does not contain any jobs.");
			return;
		};
		toggleControl("on");
		makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i = 0, j = localStorage.length; i < j; i++){
			// New safari adds extra garbage to localstorage this lets only our keys of numbers make it to the display
			if(Number(localStorage.key(i))/1 === Number(localStorage.key(i))){
				var makeLi = document.createElement("li");
				var linksLi = document.createElement("li");
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
				};
				makeSubList.appendChild(linksLi);
				makeItemLinks(key, linksLi);
			};
		};
	};

	// Make Item Links 
	// Create the edit and delete links for each object list displayed
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Job";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Job";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);

	};

	function editItem(){
		// Grab the data from our item from local storage
		var value = localStorage.getItem(this.key);
		var jobFormData = JSON.parse(value);

		// Show the form
		toggleControl("off");

		// Populate the form fields with current localstorage values
		$("jobnum").value = jobFormData.jobNum[1];
		$("company").value = jobFormData.company[1];
		$("address").value = jobFormData.address[1];
		$("city").value = jobFormData.city[1];
		$("state").value = jobFormData.state[1];
		$("zipcode").value = jobFormData.zipcode[1];
		$("phone").value = jobFormData.phone[1];
		$("email").value = jobFormData.email[1];
		$("orderdate").value = jobFormData.oDate[1];
		$("needbydate").value = jobFormData.needDate[1];
		var radios = document.forms[0].rush;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value === "Yes" && jobFormData.rushOrder[1] === "Yes" ){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value === "No" && jobFormData.rushOrder[1] === "No"){
				radios[i].setAttribute("checked", "checked");
			};
		};
		$("groups").value = jobFormData.jobType[1];
		$("custom").value = jobFormData.customInfo[1];
		$("qty").value = jobFormData.quantity[1];
		$("production").value = jobFormData.prodHours[1];
		$("design").value = jobFormData.designEff[1];

	};

	// Clears local storage and resets the job #
	function clearData(){
		if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
			alert("Local Storage does not contain any jobs.");
			return;
		};
		localStorage.clear();
		alert("All jobs deleted from local storage.");
		jobCount();
		window.location.reload();
	};
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
		};
	};
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
			};
		};
		saveData();
	};

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