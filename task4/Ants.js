let allPoints = []; // объекты. координаты (x, y)
let antmatr;
let n;
let Q = 20;
let canvas;
let contex;

window.addEventListener("DOMContentLoaded", function() 
{
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    canvas.width = 1400;
    canvas.height = 500;

    canvas.addEventListener("click", function(e) {
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        context.beginPath();
        context.arc(x, y, 8, 0, Math.PI * 2);
        context.fillStyle = "#4C0D6E";
        context.fill();
        context.stroke();

        allPoints.push({
            x: x,
            y: y
        });
        context.closePath();
    })
})

function redrawP () {
    
    for (let j = 0; j < n; j++) {
        context.beginPath();
        context.arc(allPoints[j].x, allPoints[j].y, 8, 0, Math.PI * 2);
        context.fillStyle = "#4C0D6E";
        context.fill();
        context.stroke(); 
        context.closePath();
    }
   
}

function clearcanv () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    redrawP();
}

function createline (ind1, ind2) {  //для отрисовки пути
        context.beginPath();
        context.strokeStyle = '#331950';
        context.moveTo(allPoints[ind1].x, allPoints[ind1].y);
        context.lineTo(allPoints[ind2].x, allPoints[ind2].y);
        context.stroke();
        context.closePath();
}

function line (xa, xb, ya, yb) {
    let coorx = xb - xa;
    let coory = yb - ya;
    return Math.sqrt(coorx * coorx + coory * coory);
}

function disFinder (start) {
    for (let h = 0; h < n; h++) {
        if (h != start && antmatrdist[start][h] == undefined) {
            antmatrdist[start][h] = line(allPoints[start].x, allPoints[h].x, allPoints[start].y, allPoints[h].y);
            antmatrdist[h][start] = antmatrdist[start][h];
        }
    }
}

function ant() {
    let iter = 0;

     n = allPoints.length;
     antmatrpher = new Array(n);
     for (let i = 0; i < n; i++) {
        antmatrpher[i] = new Array(n);
    }

    antmatrdist = new Array(n);
    for (let i = 0; i < n; i++) {
        antmatrdist[i] = new Array(n);
    }
    
    let paths = new Array(n);
     for (let i = 0; i < n; i++) {
        paths[i] = new Array(n);
    }
    
    let allwish;
    let city;
    let probab = [];
    let help;
    let yeah;
    let closed;
   
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            antmatrpher[i][j] = 0.2;
        }
    }
    while (iter < 1000) {
    for(let i = 0; i < n; i++) { //основной цикл для 1 прохода по вершинам (начинаем с 1 вершины, остальные муравьи пойдут со 2 и т.д.)
        city = i;
        closed = [];
        for(let r = 0; r < n; r++) {
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

        for(let j = 0; j < n; j++) {
            if (j != city && closed.includes(j) == false) {
                allwish += antmatrdist[city][j] * antmatrpher[city][j];
            }
        }
        for(let j = 0; j < n; j++) {
            if (probab[j] != 0 && closed.includes(j) == false) {
                probab[j] = (antmatrpher[city][j] * antmatrdist[city][j])/allwish;
        } 
    }
        help = Math.random();
        for (let j = 0; j < n; j++) {
            if (probab[j] != 0) {
                yeah += probab[j];
                if (yeah >= help) {
                    city = j;
                    break;
                }
            }
        }
}
}

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            antmatrpher[i][j] *= 0.64; 
        }
    }
    for (let i = 0; i < n; i++) {  
        for (let j = 0; j < n-1; j++) {
            createline(paths[i][j], paths[i][j+1]);
            antmatrpher[paths[i][j]][paths[i][j+1]] += Q/antmatrdist[paths[i][j]][paths[i][j+1]];
        }
    
    }
    setTimeout(function(e) {
        clearcanv();
    }, 2000)
    
    iter++;
    }
}
