let st;
let fin;
let fy, fx;
let cells;
let openList = [];
let closedindList = [];
let n; 
let INF = 9007199254740990;
let b;

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
        closedindList.push(i);
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

function removeField(bit) {
  if (b == true) {
    let elems = document.getElementsByClassName("block");
    while (elems.length) {elems[0].remove()}
    openList = [];
    closedindList = [];
    if (bit == true){
    st = undefined;
    fin = undefined; 
    }
    CreateField();
  } else {
    CreateField();
  }
}

function clearField() {
  removeField(false);
  cells[fin].style["background-color"] = '#6d67bf';
  cells[st].style["background-color"] = '#73B4FF';
}

//Оформление заканчивается тут

function findIndinOP (ind) {
  for (let i = 0; i < openList.length; i++) {
    if (ind == openList[i].num) {
      return i;
    }
  }
  return false;
}

function manhetten(x1, y1) {
  let dx = Math.abs(x1 - fx);
  let dy = Math.abs(y1 - fy);
  if (dx > dy) {
    return ((14 * dy) + (10 * (dx - dy)))
  }
    return (14 * dx + (10 * (dy - dx)));
}

function XY(ind) {
  let y = parseInt(ind/n);
  let x = ind - (y*n);
  let yes = manhetten(x, y);
  return yes;
}

function ColorPath (win) {
  while (win.parent != null) {
    cells[win.num].style["background-color"] = "#fce4d4";
    win = win.parent;
  }
}

function neighbors (poin) { //Ищем соседей и кидаем их в openList
  let weight;
  let point;
  let help;
  let ind = poin.num;

  if ((ind+1)%n != 0) { //правый сосед (да)
    if (closedindList.includes(ind+1) == false ) {
        cells[ind+1].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind+1);
      help = findIndinOP(ind+1);
      if (help == false) {
        point = new Node (ind+1, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
    if ((ind+1+n)%n != 0 && ind+n < n*n) { //нижний правый сосед (да)
      if (closedindList.includes(ind+1+n) == false) {
          cells[ind+1+n].style["background-color"] = '#C2FFD6'; 
        weight = XY(ind+1+n);
        help = findIndinOP(ind+1+n);
        if (help == false) {
          point = new Node (ind+1+n, poin, weight); 
          openList.push(point);
        } else {
          if (openList[help].cost > weight) {
            openList[help].parent = poin;
            openList[help].cost = weight;
          }
        }
      }
  }
  if ((ind+1-n)%n != 0 && ind-n+1 > 0) { //верхний правый сосед (да)
    if (closedindList.includes(ind+1-n) == false) {
      cells[ind+1-n].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind+1-n);
      help = findIndinOP(ind+1-n);
      if (help == false) {
        point = new Node (ind+1-n, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
  if (ind-n >= 0) { //верхний сосед (да)
    if (closedindList.includes(ind-n) == false) {
        cells[ind-n].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind-n); 
      help = findIndinOP(ind-n);
      if (help == false) {
        point = new Node (ind-n, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
  if (ind+n < n*n) { //нижний сосед (да)
    if (closedindList.includes(ind+n) == false) {
        cells[ind+n].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind+n);
      help = findIndinOP(ind+n);
      if (help == false) {
        point = new Node (ind+n, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
  if ((ind)%n != 0 && ind-1 >= 0) { //левый сосед (да)
    if (closedindList.includes(ind-1) == false) {
        cells[ind-1].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind-1);
      help = findIndinOP(ind-1);
      if (help == false) {
        point = new Node (ind-1, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
  if ((ind)%n != 0 && ind-1-n >= 0) { //левый верхний сосед (да)
    if (closedindList.includes(ind-1-n) == false) {
      cells[ind-1-n].style["background-color"] = '#C2FFD6'; 
      weight = XY(ind-1-n);
      help = findIndinOP(ind-1-n);
      if (help == false) {
        point = new Node (ind-1-n, poin, weight); 
        openList.push(point);
      } else {
        if (openList[help].cost > weight) {
          openList[help].parent = poin;
          openList[help].cost = weight;
        }
      }
    }
  }
  if ((ind)%n != 0 && ind-1+n < n*n) { //левый нижний сосед (да)
    if (closedindList.includes(ind+n-1) == false) {
        cells[ind-1+n].style["background-color"] = '#C2FFD6'; 
    weight = XY(ind+n-1);
    help = findIndinOP(ind-1+n);
    if (help == false) {
      point = new Node (ind-1+n, poin, weight); 
      openList.push(point);
    } else {
      if (openList[help].cost > weight) {
        openList[help].parent = poin;
        openList[help].cost = weight;
      }
    }
   }
  }
}

function finding () {
  let lowC = INF; //Для поиск наименшей стоимости в openList
  let rar;
    for(let i = 0; i < openList.length; i++) {
      if (openList[i].cost < lowC) {
          lowC = openList[i].cost;
          rar = i;
      } 
  }
  return rar;
}

function adding() {
  let created = false;
  let index = st;
  let current;
  let s = new Node (st, null, 0);
  openList.push(s);
  neighbors(s, st);
  closedindList.push(st);
  openList.splice(openList.indexOf(s), 1);
   while (openList.length > 0) {
     index = finding ();
     current = openList[index];
     if (current.num != fin) {
      openList.splice(index, 1);
      closedindList.push(current.num);
      neighbors(current);
     } else {
       ColorPath(current);
       created = true;
       break;
     } 
  } 
  if (created == false) {
    alert ("Ох, какая жалость! Пути нет!");
  }
}

function StartPath() {
  if (st == undefined || fin == undefined) {
    alert("Вы не поставили точку начала или точку конца");
  } else {
    fy = parseInt(fin/n);
    fx = fin - (fy*n);
    adding ();
    cells[fin].style["background-color"] = '#6d67bf';
  }
}
