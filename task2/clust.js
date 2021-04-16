window.addEventListener("DOMContentLoaded", function() 
{
    let allPoints = []; // объекты. координаты (x, y), кластер (cluster)
    let allClusters = []; // объекты. координаты (x, y), id, цвет (color), массив точек (points)
    let clusterCount;
    let pointCount = 0;
    // let usePointsForCoord = [];

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 300;

    function randColor() {
        var r = Math.floor(Math.random() * (256)),
            g = Math.floor(Math.random() * (256)),
            b = Math.floor(Math.random() * (256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }

    function clustersCount() { // количество кластеров
        if (document.getElementById('vvod').value) {
            clusterCount = parseInt(document.getElementById('vvod').value);
        }
        else {
            alert("Введите количество кластеров");
        }
    }

    function distPointClusters(point) { // расстояние от точки до кластеров
        let distToCluster = [];
        allClusters.forEach(cluster => {
            let distanceX = Math.pow(cluster.x - point.x, 2);
            let distanceY = Math.pow(cluster.y - point.y, 2);
            let dist = Math.pow(distanceX + distanceY, 0.5);
            distToCluster.push(dist);
        });

        return distToCluster;
    }

    function minDistPointCluster(point) { // расстояние от точки до ближ. кластера
        let distToCluster = distPointClusters(point);
        let minDist = distToCluster[0];
        for (let cluster = 1; cluster < distToCluster.length; cluster++) {
            if (distToCluster[cluster] < minDist) {
                minDist = distToCluster[cluster];
            }
        }

        return minDist;
    }

    function kMeasnPlusPlus() { // начальная генерация кластеров
        clustersCount();
        let points = allPoints.slice();

        let color = randColor();
        allClusters.push({
            x: points[0].x,
            y: points[0].y,
            color: color,
            points: []
        })
        points.splice(0, 1);

        for (let i = 1; i < clusterCount; i++) {
            let distance = [];
            let sumDist = 0;
            points.forEach(point => {
                let dist = minDistPointCluster(point);
                distance.push(dist * dist);
                sumDist = sumDist + (dist * dist);
            });

            let rnd = Math.random() * sumDist;
            
            let dopSum = 0;
            let j;
            for (j = 0; dopSum < rnd; j++) {
                dopSum = dopSum + distance[j];
            }

            let color = randColor();
            allClusters.push({
                x: points[j - 1].x,
                y: points[j - 1].y,
                color: color,
                points: []
            })
            points.splice(j - 1, 1);
            distance.splice(j - 1, 1);
        }

    }

    // function createClusters() {
    //     clustersCount();
    //     for (let count = 0; count < clusterCount; count++) {
    //         let x = Math.random() * (canvas.width - 5) + 5;
    //         let y = Math.random() * (canvas.width - 5) + 5;
    //         let color = randColor();

    //         allClusters.push({
    //             x: x,
    //             y: y,
    //             color: color,
    //             points: []
    //         })
    //     }

    // }

    function redrawPoint(point, color) {
        context.beginPath();
        context.globalAlpha = 1;
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    function pointsToCluster() {        
        allPoints.forEach(point => {
            let distance = distPointClusters(point);
            let minDist = minDistPointCluster(point);
            let indexClust = distance.indexOf(minDist);
            
            redrawPoint(point, allClusters[indexClust].color);
            allClusters[indexClust].points.push(point);
            point.color = allClusters[indexClust].color;
        });        
    }

    function newClusterPlace(cluster) {
        if (cluster.points.length > 0) {
            let coordX = 0;
            let coordY = 0;
            cluster.points.forEach(point => {
                coordX = coordX + point.x;
                coordY = coordY + point.y;
            });
    
            coordX =  Math.floor(coordX / cluster.points.length);
            coordY =  Math.floor(coordY / cluster.points.length);
                
            cluster.x = coordX;
            cluster.y = coordY;            
        }
            
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
        context.globalAlpha = 1;
        context.arc(x, y, 5, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        allPoints.push({
            x: x,
            y: y,
            color: "black"
        });
    })

    // function animate() {
    //     context.clearRect(0, 0, canvas.width, canvas.height);

    //     allPoints.forEach(point => {
    //         redrawPoint(point, point.color);
    //     });

    //     allClusters.forEach(cluster => {
    //         drawCluster(cluster);
    //     });

    //     pointsToCluster();
    //     flag = true;
    //     allClusters.forEach(cluster => {
    //         let oldX =  Math.floor(cluster.x);
    //         let oldY = Math.floor(cluster.y);
    //         newClusterPlace(cluster);
    //         if (oldX != Math.floor(cluster.x) && oldY != Math.floor(cluster.y)) {
    //             flag = false;
    //         }
    //     });

    //     if (flag) {
    //         clearInterval();
    //     }
    // }

    document.getElementById("start").addEventListener("click", function(e) {
        if ((pointCount == 0) || (pointCount == allPoints.length)) {
            kMeasnPlusPlus();
        }
        
        let flag = false;
        while (!flag) {
            flag = true;
            pointsToCluster();
            allClusters.forEach(cluster => {
                let oldX =  Math.floor(cluster.x);
                let oldY = Math.floor(cluster.y);
                newClusterPlace(cluster);
                if (oldX != Math.floor(cluster.x) && oldY != Math.floor(cluster.y)) {
                    flag = false;
                }
            });
        }

        if (pointCount != allPoints.length) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            allPoints.forEach(point => {
                redrawPoint(point, point.color);
            });            
        }

        allClusters.forEach(cluster => {
            drawCluster(cluster);
        });

        pointCount = allPoints.length;

        // setInterval(animate(), 100);
    })

    document.getElementById("clear").addEventListener("click", function(e) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        allPoints = [];
        allClusters = [];
        pointCount = 0;
    })
})

