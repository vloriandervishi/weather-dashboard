

// Jquery Documentation
let headerEl = document.createElement('header');
// create class along the header
headerEl.setAttribute("class", "hd-1");
document.body.appendChild(headerEl);
// create h1 tag inside the header 
let h1El = document.createElement('h1');
headerEl.appendChild(h1El);
h1El.innerText = " Weather Dashboard";
h1El.style.textAlign = "center";
headerEl.style.backgroundColor = "lightblue";
h1El.style.color = 'white';
headerEl.style.padding = "50px";
let container = document.createElement('div');
container.setAttribute('class', 'row');
document.body.appendChild(container);
let input = document.createElement('input');
input.setAttribute('id', 'search-box');
input.setAttribute('placeholder', 'enter city name');
container.appendChild(input);
let labeler = document.createElement('label');
labeler.setAttribute('id', 'search-box')
container.appendChild(labeler);
let searchButton = document.createElement('button');
searchButton.setAttribute('class', 'srchBtn');
let iBtn=document.createElement('i');
iBtn.setAttribute('class','fa fa-search');
searchButton.setAttribute('type','submit');
searchButton.appendChild(iBtn);
container.appendChild(searchButton);

$(document).ready(() => {
  // Create input box for the search input

});
