





document.getElementById("btn-search").addEventListener("click", function () {
  var textBox = document.getElementById("input-search");
  var partialOrFullTitle = textBox.value;
  console.log("partial or full title String:" + partialOrFullTitle);
  clearLogicOperationDiv();
  displayTable1(partialOrFullTitle);
});


function populateTable1(json, tablesql, i) {
    var table = document.getElementById("tableBrowse");
    var row = table.insertRow(-1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);

    cell0.innerHTML = i;
    cell1.innerHTML = json.title;
    cell2.innerHTML = json.authorFirst + " "+ json.authorLast;
    cell3.innerHTML = json.publisherName;
    cell4.innerHTML = json.numCopies;
  }




function displayTable1(partialOrFullTitle) {
      var parentDiv = document.getElementById("logicDiv");
      let table = document.getElementById("tableBrowse");

      let query = getSearchQuery1(partialOrFullTitle);
      let url = "localhost";
      let params = "table=" + "search" + "&query=" + query;

      console.log("Search query:" + query);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              var finalQueryResult = xhr.responseText;
              console.log(finalQueryResult);
              var myJsonObject = JSON.parse(finalQueryResult);
              for (var i = 0; i < myJsonObject.length; i++) {
                  populateTable1(myJsonObject[i], "searchResult", i);
              }
          }
      };

      xhr.open("POST", url, true);

      xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
      );

      xhr.send(params);
  }


  function Go() {
    clearLogicOperationDiv();
    var operation = getOperationSelected();
    if (operation == "Search") {
        console.log("Search selected");
        performSearch();
    } else {
        console.log("error at Go()");
    }
}

function getOperationSelected() {
    var radioButtonValue;
    radioButtonValue = "Search";

    return radioButtonValue;
}


function clearLogicOperationDiv() {
    var operationLogicDiv = document.getElementById("logicDiv");
    while (operationLogicDiv.hasChildNodes()) {
        operationLogicDiv.removeChild(operationLogicDiv.firstChild);
    }
}



function performSearch() {
    console.log("This is inside performSearch");
    var OpLogicDiv = document.getElementById("logicDiv");
    var inputTextBox = createTextBox(
        OpLogicDiv,
        "search" + "_" + "1",
        "Enter a book title (partial or full) and search: ",
        ""
    );
    var button = document.createElement("button");
    button.innerHTML = "Search";

    OpLogicDiv.appendChild(button);

    button.addEventListener("click", function () {
        clearLogicOperationDiv();
        var partialOrFullTitle = inputTextBox.value;

        console.log("partial or full title String:" + partialOrFullTitle);
        displaySearchResultTable(partialOrFullTitle);
    });
}

function displaySearchResultTable(partialOrFullTitle) {
    var parentDiv = document.getElementById("logicDiv");
    var table = document.createElement("TABLE");
    table.className = "altrowstable";
    table.id = "searchTable";
    parentDiv.appendChild(table);
    console.log(table);
    var query = getSearchQuery(partialOrFullTitle);
    var url = "localhost";
    var params = "table=" + "search" + "&query=" + query;
    console.log("Search query:" + query);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var finalQueryResult = xhr.responseText;
            console.log(finalQueryResult);
            var myJsonObject = JSON.parse(finalQueryResult);


            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }
            var row = table.insertRow(-1);
            row.className = "headingrowcolor2";
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            var cell9 = row.insertCell(8);

            cell1.innerHTML = "title".bold();
            cell2.innerHTML = "availability".bold();
            cell5.innerHTML = "authorFirst".bold();
            cell6.innerHTML = "authorLast".bold();
            cell7.innerHTML = "publisherCode".bold();
            cell8.innerHTML = "publisherName".bold();
            cell9.innerHTML = "city".bold();
            for (var i = 0; i < myJsonObject.length; i++) {
                populateTable(myJsonObject[i], "searchResult", i);
            }
        }
    };
    xhr.open("POST", url, true);

    xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    xhr.send(params);
}



function getSearchQuery1(partialOrFullTitle) {
    var searchQ =
        "select B.title, B.numCopies, A.authorLast, A.authorFirst, P.publisherName from book B, author A, publisher P, wrote W where (B.publisherCode ~ P.publisherCode and A.authorNum ~ W.authorNum and W.bookCode ~ B.bookCode) and B.title LIKE " +
        '"%' +
        partialOrFullTitle +
        '%"';
    return searchQ;
}

function getSearchQuery(partialOrFullTitle) {
    var searchQ =
        "select B.title, B.numCopies, A.authorNum,A.authorLast,A.authorFirst,P.publisherCode,P.publisherName,P.city from book B, author A,publisher P, wrote W where (B.publisherCode ~ P.publisherCode and A.authorNum ~ W.authorNum and W.bookCode ~ B.bookCode) and B.title LIKE " +
        '"%' +
        partialOrFullTitle +
        '%"';
    return searchQ;
}

function createTextBox(parent, ID, lable, text) {
  var newDiv = document.createElement("div");
  newDiv.id = "divOf_" + ID;
  newDiv.className = "newDiv";
  var element = document.createElement("input");
  element.id = ID;

  var label = document.createElement("Label");
  label.innerHTML = lable;

  element.setAttribute("type", "text");
  element.setAttribute("value", text);
  element.setAttribute("name", "Test Name");
  element.setAttribute("style", "width:200px");

  label.setAttribute("style", "font-weight:normal");

  newDiv.appendChild(label);
  newDiv.appendChild(element);
  parent.appendChild(newDiv);
  return element;
}



function populateTable(json, tablesql, i) {
  var table = document.getElementById("myTable");

  if (tablesql == "searchResult") {
    console.log("searchResult selected");
    var table = document.getElementById("searchTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);

    cell1.innerHTML = json.title;
    cell2.innerHTML = json.OnHand;
    cell3.innerHTML = json.BranchNum;
    cell4.innerHTML = json.authorNum;
    cell5.innerHTML = json.authorLast;
    cell6.innerHTML = json.authorFirst;
    cell7.innerHTML = json.publisherCode;
    cell8.innerHTML = json.publisherName;
    cell9.innerHTML = json.city;
  } 
   else {
    console.log("Error at populateTable");
  }
}