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
	function formLists(selector, array, id){
		var formtTag = document.getElementsByTagName("form"),
			selectLi = $(selector),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", id);
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
			jobFormData.jobType		= ["Job Type", $("jobTypeList").value];
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
		console.log(value);
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
		$("jobTypeList").value = jobFormData.jobType[1];
		$("custom").value = jobFormData.customInfo[1];
		$("qty").value = jobFormData.quantity[1];
		$("production").value = jobFormData.prodHours[1];
		$("design").value = jobFormData.designEff[1];

		// Remove initial listener from submit button
		save.removeEventListener("click", validation);
		// Change submit button to edit button
		$("submit").value = "Edit Job";
		var editSubmit = $("submit");
		// Passes the key value along to the editSubmit event
		// This allows us to save over the data we are editing instead of creating a new object
		editSubmit.key = this.key;
		editSubmit.addEventListener("click", validation);

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
	function validation(e){
		console.log("1 got here");
		var getCompany = $("company");
		var getAddress = $("address");
		var getCity = $("city");
		var getState = $("state");
		var getZip = $("zipcode");
		var getPhone = $("phone");
		var getEmail = $("email");
		var getOrderDate = $("orderdate");
		var getNeedByDate = $("needbydate");
		var getJobTypeList = $("jobTypeList");
		var getCustom = $("custom");
		var getQty = $("qty");
		var getProduction = $("production");

		// Reset Error Messages
		errorMsg.innerHTML = "";

		// Get Error Messages
		var messageAry = [];

		// Validations
		if (getCompany.value === ""){
			var companyError = "Please enter a company name.";
			getCompany.style.border = "1px solid red";
			messageAry.push(companyError);
		}
		if (getAddress.value === ""){
			var addressError = "Please enter an address.";
			getAddress.style.border = "1px solid red";
			messageAry.push(addressError);
		}
		if (getCity.value === ""){
			var cityError = "Please enter a city.";
			getCity.style.border = "1px solid red";
			messageAry.push(cityError);
		}
		if (getState.value === ""){
			var stateError = "Please enter a state.";
			getState.style.border = "1px solid red";
			messageAry.push(stateError);
		}
		if (getZip.value === ""){
			var zipError = "Please enter a zip code.";
			getZip.style.border = "1px solid red";
			messageAry.push(zipError);
		}
		var re = /\d{3}-\d{3}-\d{4}/;
		if(!(re.test(getPhone.value))){
			var phoneError = "Please enter a valid phone number.";
			getPhone.style.border = "1px solid red";
			messageAry.push(phoneError);
		}
		var re = /^\w+@[\w.\-]+\.[A-Za-z]{2,3}$/;
		if(!(re.test(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		var d = new Date();
		if (getOrderDate.value === ""){
			var orderDateError = "Please enter a valid order date yyyy-mm-dd";
			getOrderDate.style.border = "1px solid red";
			messageAry.push(orderDateError);
		} else if(Date.parse(getOrderDate.value) > Date.parse(getNeedByDate.value)) {
			orderDateError = "Invalid - Order date can not fall after due date.";
			getOrderDate.style.border = "1px solid red";
			messageAry.push(orderDateError);
		}
		if (getNeedByDate.value === ""){
			var needByDateError = "Please enter a valid due date yyyy-mm-dd";
			getNeedByDate.style.border = "1px solid red";
			messageAry.push(needByDateError);
		} else if(Date.parse(getNeedByDate.value) < Date.parse(getOrderDate.value)) {
			needByDateError = "Invalid - Due date can not fall before order date.";
			getNeedByDate.style.border = "1px solid red";
			messageAry.push(needByDateError);
		}
		if(getJobTypeList.value === "--Job Types--"){
			var JobTypeListError = "Please choose a job type.";
			getJobTypeList.style.border = "1px solid red";
			messageAry.push(JobTypeListError);
		}
		if(getJobTypeList.value === "Custom" && getCustom.value === ""){
			var customError = "Please describe the custom job.";
			getCustom.style.border = "1px solid red";
			messageAry.push(customError);
		}
		if (getQty.value === ""){
			var qtyError = "Please enter a quantity.";
			getQty.style.border = "1px solid red";
			messageAry.push(qtyError);
		} else if(getQty.value/1 !== getQty.value){
			var qtyError = "Please enter a valid quantity number.";
			getQty.style.border = "1px solid red";
			messageAry.push(qtyError);
		}
		if (getProduction.value === ""){
			var productionError = "Please enter a LOE amount.";
			getProduction.style.border = "1px solid red";
			messageAry.push(productionError);
		} else if(getProduction.value/1 !== getProduction.value){
			var productionError = "Please enter a valid LOE number.";
			getProduction.style.border = "1px solid red";
			messageAry.push(productionError);
		}
		if(messageAry.length >= 1){
			for(var i=0, j = messageAry.length; i<j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			storeData();
		}
	};

	// Variable defaults
	var jobTypes = ["--Job Types--", "Banner", "Decal", "Sign", "Custom"];
	var jobNumCount;
	var rushValue;
	var errorMsg = $("errors");
	// Calls the function to create the select box and populates with job types
	formLists("jobTypes", jobTypes, "jobTypeList");
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