window.addEventListener("DOMContentLoaded", function() 
{
    let allPoints = []; // объекты. координаты (x, y), кластер (cluster)
    let allClusters = []; // объекты. координаты (x, y), id, цвет (color), массив точек (points)
    let clusterCount;

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    function randColor() {
        var r = Math.floor(Math.random() * (256)),
            g = Math.floor(Math.random() * (256)),
            b = Math.floor(Math.random() * (256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }

    function clustersCount() {
        if (document.getElementById('vvod').value) {
            clusterCount = parseInt(document.getElementById('vvod').value);
        }
        else {
            alert("Введите количество кластеров");
        }
    }

    function createClusters() {
        clustersCount();
        for (let count = 0; count < clusterCount; count++) {
            let x = Math.random() * (495 - 5) + 5;
            let y = Math.random() * (495 - 5) + 5;
            let color = randColor();

            allClusters.push({
                x: x,
                y: y,
                color: color,
                points: []
            })
        }
    }

    function redrawPoint(point, color) {
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    function pointsToCluster() {        
        allPoints.forEach(point => {
            let distToCluster = [];

            allClusters.forEach(cluster => {
                let distanceX = Math.pow(cluster.x - point.x, 2);
                let distanceY = Math.pow(cluster.y - point.y, 2);
                let dist = Math.pow(distanceX + distanceY, 0.5);
                distToCluster.push(dist);
            });

            let indexClust = 0;
            for (let cluster = 1; cluster < distToCluster.length; cluster++) {
                if (distToCluster[cluster] < distToCluster[indexClust]) {
                    indexClust = cluster;
                }
            }
            
            redrawPoint(point, allClusters[indexClust].color);
            allClusters[indexClust].points.push(point);
        });        
    }

    function newClusterPlace(cluster) {
        let coordX = 0;
        let coordY = 0;
        cluster.points.forEach(point => {
            coordX = coordX + point.x;
            coordY = coordY + point.y;
        });

        coordX =  Math.round(coordX / cluster.points.length);
        coordY =  Math.round(coordY / cluster.points.length);
            
        cluster.x = coordX;
        cluster.y = coordY;
            
    }

    function drawCluster(cluster) {
        context.beginPath();
        context.arc(cluster.x, cluster.y, 25, 0, Math.PI * 2);

        context.globalAlpha = 0.5;
        context.fillStyle = cluster.color;
        context.fill();
        context.strokeStyle = cluster.color;
        context.stroke();
    }


    canvas.addEventListener("click", function(e) {
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.fill();
        context.stroke();

        allPoints.push({
            x: x,
            y: y,
            color: ""
        });
    })

    document.getElementById("start").addEventListener("click", function(e) {
        createClusters();
        let flag = false;
        while (!flag) {
            flag = true;
            pointsToCluster();
            allClusters.forEach(cluster => {
                let oldX = cluster.x;
                let oldY = cluster.y;
                newClusterPlace(cluster);
                if (oldX != cluster.x && oldY != cluster.y) {
                    flag = false;
                }
            });
        }

        allClusters.forEach(cluster => {
            drawCluster(cluster);
        });

    })
})

