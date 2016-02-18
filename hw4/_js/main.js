var i=0;  //todo item counter
var j=0; //complete item counter

$(document).ready(function() {
	$("#sub-btn").on("click", btnClicked);

});

//function to add new item in to-do list. this can be invoked either by adding a new item via input box or by undoing item in completed list
function addToDo(item){
		itemname='list'+i;
    	$("#to-do-list").prepend("<li id="+itemname+">"+item+" <button class='done' id="+i+" >Mark Done</button> </li>");
    	i++;
}

//event handler function to handle  clicking on add button to add item via input box
function btnClicked(evnt){
	var item= $("#add-item").val();
		$("#add-item").val('');
		addToDo(item);
}

//event handler to handle click of any button in to do list
$( "#to-do-list" ).delegate( "button", "click", function() {
  item=document.getElementById('list'+this.id);
  val = item.childNodes[0].nodeValue.trim();
  itemname='listcom'+j;
  $("#completed-list").prepend("<li id="+itemname+">"+val+" <button class='done' id="+j+" >Not done</button> </li>");
  j++;
  parent =document.getElementById("to-do-list");
  parent.removeChild(item);
});

//event handler to handle click of any button in completed list
$( "#completed-list" ).delegate( "button", "click", function() {
  item=document.getElementById('listcom'+this.id);
  val = item.childNodes[0].nodeValue.trim();
  addToDo(val);
  parent =document.getElementById("completed-list");
  parent.removeChild(item);
});