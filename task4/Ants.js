let allPoints = []; // объекты. координаты (x, y)
let antmatr;
let n;
let Q = 20;

class PhVer {
    constructor(pher, dist) { 
        this.dist = dist;
        this.pher = pher;
    }
}

window.addEventListener("DOMContentLoaded", function() 
{
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

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

        console.log(allPoints);
    })
})

function redrawP () {
    for (let j = 0; j < n; j++) {
        context.arc(allPoints[j].x, allPoints[j].y, 8, 0, Math.PI * 2);
        context.fillStyle = "#4C0D6E";
        context.fill();
        context.stroke();
    }
}

function createline (ind1, ind2) {  //для отрисовки пути
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    setTimeout(function() {
        ctx.beginPath();
        ctx.strokeStyle = '#331950';
        ctx.moveTo(allPoints[ind1].x, allPoints[ind1].y);
        ctx.lineTo(allPoints[ind2].x, allPoints[ind2].y);
        ctx.stroke();
      }, 1000);
}

function line (xa, xb, ya, yb) {
    let coorx = xb - xa;
    let coory = yb - ya;
    return Math.sqrt(coorx * coorx + coory * coory);
}

function disFinder (start) {
    for (let h = 0; h < n; h++) {
        if (h != start && antmatr[start][h].dist == undefined) {
            antmatr[start][h].dist = line(allPoints[start].x, allPoints[h].x, allPoints[start].y, allPoints[h].y);
            antmatr[h][start].dist = antmatr[start][h].dist;
        }
    }
}

function ant() {
     n = allPoints.length;
     antmatr = new Array(n);
     for (let i = 0; i < n; i++) {
        antmatr[i] = new Array(n);
    }

    let paths = new Array(n);
     for (let i = 0; i < n; i++) {
        paths[i] = new Array(n);
    }
    console.log("ало");
    let allwish;
    let city;
    let probab = [];
    let help;
    let yeah;
    let closed;
   
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            let s = new PhVer (undefined, 0.200);
            antmatr.push(s);
            paths[i][j] = null;
        }
    }
    //более глобальный цикл
    for(let i = 0; i < n; i++) { //основной цикл для 1 прохода по вершинам (начинаем с 1 вершины, остальные муравьи пойдут со 2 и т.д.)
        city = i;
        closed = [];
        for(let r = 0; r < n; r++) {
        paths[i][r] = city;
        yeah = 0;
        probab[city] = null;
        closed.push(city);
        disFinder(city);
        for(let j = 0; j < n; j++) {
            if (j != city && closed.includes(j) == false) {
                allwish += antmatr[city][j].dist * antmatr[city][j].pher;
            }
        }
        for(let j = 0; j < n; j++) {
            if (probab[j] != null) {
                probab[j] = (antmatr[city][j].pher * antmatr[city][j].dist)/allwish;
        } 
    }
        help = Math.random();
        for (let j = 0; j < n; j++) {
            if (probab[j] != null) {
                yeah += probab[j];
                if (yeah > help) {
                    city = j;
                    break;
                }
            }
        }
    }
}
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            antmatr[i][j].pher *= 0.64; 
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-1; j++) {
            createline(paths[i][j], paths[i][j+1]);
            antmatr[paths[i][j]][paths[i][j+1]].pher += Q/antmatr[paths[i][j]][paths[i][j+1]].dist;
        }
    }
}