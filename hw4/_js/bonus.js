var i=0;  //todo item counter
var j=0; //complete item counter


window.onload = function() {
  var subButton = document.getElementById('sub-btn');
  subButton.addEventListener('click', btnClicked);
}

//event handler to handle click of any button in to do list
function toDoClicked(event){
  item=document.getElementById('list'+this.id);
  val = item.childNodes[0].nodeValue.trim();
  itemname='listcom'+j;
  var list = document.getElementById('completed-list');
  var entry = document.createElement('li');
  entry.setAttribute("id",itemname);
  entry.appendChild(document.createTextNode(val));
  btn=document.createElement('button');
  btn.appendChild(document.createTextNode("Not Done"));
  btn.setAttribute("id",j);
  btn.addEventListener('click',completedClicked);
  entry.appendChild(btn);
  list.insertBefore(entry,list.firstChild);
  j++;
  parent =document.getElementById("to-do-list");
  parent.removeChild(item);
}
//function to add new item in to-do list. this can be invoked either by adding a new item via input box or by undoing item in completed list
function addToDo(item){
		itemname='list'+i;
    var list = document.getElementById('to-do-list');
    var entry = document.createElement('li');
    entry.setAttribute("id",itemname);
    entry.appendChild(document.createTextNode(item));
    btn=document.createElement('button');
    btn.appendChild(document.createTextNode("Mark Done"));
    btn.setAttribute("id",i);
    btn.addEventListener('click',toDoClicked);
    entry.appendChild(btn);
    list.insertBefore(entry,list.firstChild);
    i++;
}

//event handler function to handle  clicking on add button to add item via input box
function btnClicked(evnt){
  var item = document.getElementById("add-item").value
  document.getElementById("add-item").value =""
	addToDo(item);
}

//event handler to handle click of any button in completed list
function completedClicked() {
  item=document.getElementById('listcom'+this.id);
  val = item.childNodes[0].nodeValue.trim();
  addToDo(val);
  parent =document.getElementById("completed-list");
  parent.removeChild(item);
}