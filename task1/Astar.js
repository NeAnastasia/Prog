let n;
let s, f;
let INF = 9007199254740991;
let n = prompt ('Размер поля:', ''); //Сделать более адекватный ввод
let sx = prompt ('Начало X:', '') //Старт должен быть там, где ткнёт пользователь
let sy = prompt ('Начало Y:', '') //Старт должен быть там, где ткнёт пользователь
let fx = prompt ('Конец X:', '') //Конец должен быть там, где ткнёт пользователь
let fy = prompt ('Конец Y:', '') //Конец должен быть там, где ткнёт пользователь
sx--; sy--; fx--; fy--;

class Node { 
        constructor(x, y, parent) {
            this.x = x;
            this.y = y;
            this.parent = parent;
            this.cost = cost;
    }
}

let s = new Node (sx, sy, null, 0);

let openList = [];
let closedList = []; //сюда изначально нужно будет поместить выбранные пользователем места для препятствий
openList.push(s);

function manhetten (x1, y1, x2, y2) { //Дистанция до клетки по формуле Манхеттена
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    if (dx > dy) {
        return ((14 * dy) + (10 * (dx - dy)))
      }
      return (14 * dx + (10 * (dy - dx)));
}

function find () {
    let lowC = INF; //Для поиск наименшей стоимости в openList
    let Ind;
      for(let i = 0; i < openList.length; i++) {
        if (openList[i].cost < lowC) {
           lowC = openList[i].cost;
            Ind = i;
        } 
    }
    return Ind;
}

function neighbors (Node) { //Ищем соседей и кидаем их в openList
    let x = Node.x;
    let y = Node.y;
    let weight;
 
    if (x-1 >= 0) {
        weight = manhetten (x-1, y, x, y);
        let point = new Node (x-1, y, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (x+1 < n) {
        weight = manhetten (x+1, y, x, y);
        let point = new Node (x+1, y, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (y-1 >= 0) {
        weight = manhetten (x, y-1, x, y);
        let point = new Node (x, y-1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (y+1 < n) {
        weight = manhetten (x, y+1, x, y);
        let point = new Node (x, y+1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (x+1 < n && y+1 < n) {
        weight = manhetten (x+1, y+1, x, y);
        let point = new Node (x+1, y+1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (x+1 < n && y-1 >= 0) {
        weight = manhetten (x+1, y-1, x, y);
        let point = new Node (x+1, y-1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (x-1 >= 0 && y+1 < n) {
        weight = manhetten (x-1, y+1, x, y);
        let point = new Node (x-1, y+1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
    if (x-1 >= 0 && y-1 >= 0) {
        weight = manhetten (x-1, y-1, x, y);
        let point = new Node (x-1, y-1, Node, weight);
        if (closedList.find(point) != undefined) { openList.push(point); }
    }
  }

function astar(n, start, end) {
while (openList.length > 0) {
    let ind = find ();
    closedList.push(openList[ind]);
    let current = openList[ind];
    openList[ind].remove();
    neighbors(current);
    }
}