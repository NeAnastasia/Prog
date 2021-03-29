let st;
let fin;
let fy, fx;
let cells;
let b;
let openList = [];
let closedList = [];
let closedindList = [];
let n; 

class Node { 
  constructor(num, parent, cost) {
      this.num = num;
      this.parent = parent;
      this.cost = cost;
  }
}

//Оформление начинается тут

function CreateField() {
    b = true;
    n = parseInt(document.getElementById('vvod').value);
    if (n <= 0) {
      alert("Введите положительное число!");
    } else {
    let DrawField = document.getElementById('FMap');
          for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                let Cell = document.createElement("div"); 
                Cell.className = "block";
                Cell.style["grid-column-start"]=j;
                DrawField.appendChild(Cell);
            }
          }
    }
}

function StartPoint() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = function(e) {
        if (st == undefined) {
          cells[i].style["background-color"] = '#73B4FF';
          st = i;
        } else {
          cells[st].style["background-color"] = '#F6FFFE';
          cells[i].style["background-color"] = '#73B4FF';
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
        let poin = new Node (i, null, null);
        closedList.push(poin);
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

function removeField() {
  if (b == true) {
    //let field = document.getElementById('FMap');
    CreateField();
  } else {
    CreateField();
  }
}

//Оформление заканчивается тут

function manhetten(x1, y1) {
  let dx = Math.abs(x1 - fx);
  let dy = Math.abs(y1 - fy);
  return dx + dy;
}

function XY(ind) {
  let y = parseInt(ind/n);
  let x = ind - (y*n);
  let yes = manhetten(x, y);
  return yes;
}

function neighbors (ind) { //Ищем соседей и кидаем их в openList
  let weight;

  if ((ind+1)%n != 0) { //правый сосед (да)
    if (closedindList.includes(ind+1) == false) {
      cells[ind+1].style["background-color"] = '#A4FF91';
      weight = XY(ind+1) + 10;
      cells[ind+1].style["background-color"] = '#C2FFD6';
    }
  }
    if ((ind+1+n)%n != 0 && ind+n < n*n) { //нижний правый сосед (да)
      if (closedindList.includes(ind+1+n) == false) {
        cells[ind+1+n].style["background-color"] = '#C2FFD6';
        weight = 14;
      }
  }
  if ((ind+1-n)%n != 0 && ind-n+1 > 0) { //верхний правый сосед (да)
    if (closedindList.includes(ind+1-n) == false) {
      cells[ind+1-n].style["background-color"] = '#C2FFD6'; 
      weight = 14;
    }
  }
  if (ind-n >= 0) { //верхний сосед (да)
    if (closedindList.includes(ind-n) == false) {
      cells[ind-n].style["background-color"] = '#C2FFD6';
      weight = 10;
    }
  }
  if (ind+n < n*n) { //нижний сосед (да)
    if (closedindList.includes(ind+n) == false) {
      cells[ind+n].style["background-color"] = '#C2FFD6';
      weight = 10;
    }
  }
  if ((ind)%n != 0 && ind-1 >= 0) { //левый сосед (да)
    if (closedindList.includes(ind-1) == false) {
      cells[ind-1].style["background-color"] = '#C2FFD6';
      weight = 10;
    }
  }
  if ((ind)%n != 0 && ind-1-n >= 0) { //левый верхний сосед (да)
    if (closedindList.includes(ind-1-n) == false) {
      cells[ind-1-n].style["background-color"] = '#C2FFD6';
      weight = 14;
    }
  }
  if ((ind)%n != 0 && ind-1+n < n*n) { //левый нижний сосед (да)
    if (closedindList.includes(ind+n-1) == false) {
    cells[ind-1+n].style["background-color"] = '#C2FFD6';
    weight = 14;
   }
  }
}

function adding() {
  let index;
  let s = new Node (st, null, 0);
  openList.push(s);
  neighbors(st);
  closedindList.push(st);
  closedList.push(s);
}

function StartPath() {
  if (st == undefined || fin == undefined) {
    alert("Вы не поставили точку начала или точку конца");
  } else {
    fy = parseInt(fin/n);
    fx = fin - (fy*n);
    adding ();
  }
}
