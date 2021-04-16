let allPoints = []; // объекты. координаты (x, y)
let antmatrdist;
let antmatrpher;
let paths;
let n;
let Q = 1;
let canv;
let lines;
let min;
let b;

document.getElementsByClassName("canvas")[0].addEventListener("click", function(e) {
    canv = document.getElementsByClassName("canvas")[0];
    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    let rect = canv.getBoundingClientRect();
    point.classList.add("point");
    point.setAttribute("cx", e.clientX - rect.left);
    point.setAttribute("cy", e.clientY - rect.top);
    canv.appendChild(point);
    point.setAttribute("r", 12);

    allPoints.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    });
})

function createline(ind) { //передать сюда индекс строки с лучшим путём сразу
    let childs = canv.getElementsByTagName("line");
    let current;
    while (childs.length) {
        childs[0].remove();
    }
    for (let t = 0; t < n - 1; t++) {
        current = document.createElementNS("http://www.w3.org/2000/svg", "line");
        current.classList.add("antLine");
        current.setAttribute("x1", allPoints[paths[ind][t]].x);
        current.setAttribute("y1", allPoints[paths[ind][t]].y);
        current.setAttribute("x2", allPoints[paths[ind][t + 1]].x);
        current.setAttribute("y2", allPoints[paths[ind][t + 1]].y);
        canv.prepend(current);
    }
    current = document.createElementNS("http://www.w3.org/2000/svg", "line");
    current.classList.add("antLine");
    current.setAttribute("x1", allPoints[paths[ind][n - 1]].x);
    current.setAttribute("y1", allPoints[paths[ind][n - 1]].y);
    current.setAttribute("x2", allPoints[paths[ind][0]].x);
    current.setAttribute("y2", allPoints[paths[ind][0]].y);
    canv.prepend(current);
}

function clear_canvas(e) {
    let elems = document.getElementsByClassName("canvas")[0].childNodes;
    while (elems.length) {
        elems[0].remove();
    }
    allPoints = [];
}

function line(xa, xb, ya, yb) {
    let coorx = xb - xa;
    let coory = yb - ya;
    return Math.sqrt(coorx * coorx + coory * coory);
}

function disFinder(start) {
    for (let h = 0; h < n; h++) {
        if (h != start && antmatrdist[start][h] == undefined) {
            antmatrdist[start][h] = line(allPoints[start].x, allPoints[h].x, allPoints[start].y, allPoints[h].y);
            antmatrdist[h][start] = antmatrdist[start][h];
        }
    }
}

function iter_ant(iter){
    let allwish;
    let city;
    let probab = [];
    let help;
    let yeah;
    let closed;
    let pathdist;
    let ind;
    b = 0;
    
    paths = new Array(n);
    for (let i = 0; i < n; i++) {
        paths[i] = new Array(n);
    }
    for (let i = 0; i < n; i++) { //основной цикл для 1 прохода по вершинам (начинаем с 1 вершины, остальные муравьи пойдут со 2 и т.д.)
        city = i;
        closed = [];
        pathdist = 0;
        for (let r = 0; r < n; r++) {
            probab = [];
            allwish = 0;
            paths[i][r] = city;
            yeah = 0;
            probab[city] = 0;
            closed.push(city);
            disFinder(city);
            for (let w = 0; w < closed.length; w++) {
                probab[closed[w]] = 0;
            }

            for (let j = 0; j < n; j++) {
                if (j != city && closed.includes(j) == false) {
                    allwish += antmatrdist[city][j] * antmatrpher[city][j];
                }
            }
            for (let j = 0; j < n; j++) {
                if (probab[j] != 0 && closed.includes(j) == false) {
                    probab[j] = (antmatrpher[city][j] * antmatrdist[city][j]) / allwish;
                }
            }
            help = Math.random();
            for (let j = 0; j < n; j++) {
                if (probab[j] != 0) {
                    yeah += probab[j];
                    if (yeah >= help) {
                        pathdist += antmatrdist[city][j];
                        city = j;
                        break;
                    }
                }
            }
        }

        dists[i] = pathdist;
    }
    for (let i = 0; i < n; i++) {
        dists[i] += antmatrdist[paths[i][0]][paths[i][n - 1]];
        for (let j = 0; j < n; j++) {
            antmatrpher[i][j] *= 0.64;
        }
    }

    for (let i = 0; i < n; i++) {
        if (min > dists[i]) {
            min = dists[i];
            ind = i;
            b = 1;
        }
        for (let j = 0; j < n - 1; j++) {
            antmatrpher[paths[i][j]][paths[i][j + 1]] += Q / antmatrdist[paths[i][j]][paths[i][j + 1]];
        }
    }
    if (b == 1) {
        createline(ind);
    }
    console.log(min);
    
    if(iter < 1000){
        setTimeout(()=>{iter_ant(iter+1)}, 20)
    }
}

function ant() {
    min = 9007199254740990;
    dists = new Array(n);
    n = allPoints.length;
    antmatrpher = new Array(n);
    for (let i = 0; i < n; i++) {
        antmatrpher[i] = new Array(n);
    }

    antmatrdist = new Array(n);
    for (let i = 0; i < n; i++) {
        antmatrdist[i] = new Array(n);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            antmatrpher[i][j] = 0.2;
        }
    }
    iter_ant(0);
}
