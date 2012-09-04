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
	
	// Variable defaults
	var jobTypes = ["--Job Types--", "Banner", "Decal", "Sign", "Custom"];
	
	formLists("jobTypes", jobTypes);
	
	// Set Link $ Submit Click Events
	var displayData = $("displayData");
	displayData.addEventListener("click", getData);
	var clearData = $("clearData");
	clearData.addEventListener("click", clearData);
	var saveJob = $("submit");
	saveData.addEventListener("click", saveData);
});