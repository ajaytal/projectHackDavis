// function loadData() {
//     var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vTD712q_M9zKlgZQj0bKG9oOF4HUCxEV3ez5r2ubvrcerG2xMozOpMGDwpxHOOJXHAjf6BasNLB9hF8/pub?gid=0&single=true&output=csv";
//     xmlhttp=new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//       if(xmlhttp.readyState == 4 && xmlhttp.status==200){
//         document.getElementById("display").innerHTML = xmlhttp.responseText;
//       }
//     };
//     xmlhttp.open("GET",url,true);
//     xmlhttp.send(null);
//     console.log("HELLO")
//   }
  
  
const reader = require("g-sheets-api");
const readerOptions = {
  sheetId: "1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg",
  returnAllResults: false,
  filter: {
    "key to filter on": "value to match",
  },
};

reader(readerOptions, (results) => {
  /* Do something amazing with the results */
});