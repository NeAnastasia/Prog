let st;
let fin;
let cells;

function CreateField(){
    let n = parseInt(document.getElementById('vvod').value);
    let DrawField = document.getElementById('FMap');
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                let Cell = document.createElement("div"); 
                Cell.className = "block";
                Cell.style["grid-column-start"]=j+1;
              DrawField.appendChild(Cell);
            }
        }
}

function StartPoint() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = function(e) {
        if (st == undefined) {
          cells[i].style["background-color"] = '#9CE4FF';
          st = i;
        } else {
          cells[st].style["background-color"] = '#F6FFFE';
          cells[i].style["background-color"] = '#9CE4FF';
          st = i;
        }
    }
  }
}

function FinalPoint() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function(e) {
      if (fin == undefined) {
        cells[i].style["background-color"] = '#6d67bf';
        fin = i;
      } else {
        cells[fin].style["background-color"] = '#F6FFFE';
        cells[i].style["background-color"] = '#6d67bf';
        fin = i;
      }
    }
  }
}

function WallPoints() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function(e) {
        cells[i].style["background-color"] = '#2E3236';
    }
  }
}

function WhatToDo() {
  cells = document.getElementsByClassName('block'); 
  if (document.getElementById("radio1").checked) {
    StartPoint();
  } else if (document.getElementById("radio2").checked) {
    FinalPoint();
  } else {
    WallPoints();
  }
}
