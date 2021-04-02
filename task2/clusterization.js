window.addEventListener("DOMContentLoaded", function() 
{
    let allPoints = []; // объекты. координаты (x, y), id, кластер (cluster)
    let allClusters = []; // объекты. координаты (x, y), id, цвет (color), массив точек (points)
    const board = document.querySelector("canvas");
    const context = board.getContext("2d");
   

    function clusterCount() {
        if (document.getElementById('vvod').value) {
            let clusterCount = parseInt(document.getElementById('vvod').value);
        }
        else {
            alert("Введите количество кластеров");
        }
    }

    function createClusters() {
        // создать clusterCount кластеров и рандомно раскидать по полю
        // сгенерировать цвет каждого кластера
    }

    function pointsToCluster() {
        // для каждой точки найти ближайшую к ней кластер-точку и добавить ее в этот кластер
        // т.е к объекту данного кластера добавить эту точку, а точку закрасить
        for (let point = 0; point < allPoints.length; point++) {
            let distToCluster = [];
            for (let cluster = 0; cluster < allClusters; cluster++) {
                let distanceX = Math.pow(allClusters[cluster].x - allPoints[point].x, 2);
                let distanceY = Math.pow(allClusters[cluster].y - allPoints[point].y, 2);
                let distance = Math.pow(distanceX + distanceY, 0.5);
                distToCluster.push(distance);
            }
            
            let clust;
            for (let cluster = 1; cluster < distToCluster; cluster++) {
                if (distToCluster[cluster] < distToCluster[allPoints[point].cluster]) {
                    allPoints[point].cluster = cluster;
                    clust = cluster;
                }
            }
            
            document.getElementById(allPoints[point].id).style.color = allClusters[clust].color;
            allClusters[clust].points.push(allPoints[point]);
        }
    }

    function newClusterPlace() {
        // рассчитать средние координаты в каждом кластере
        // это новые координаты для кластера
        let coordX = 0;
        let coordY = 0;
        allClusters.forEach(cluster => {
            cluster.points.forEach(point => {
                coordX = coordX + point.x;
                coordY = coordY + point.y;
            });

            coordX =  Math.round(coordX / cluster.points.length);
            coordY =  Math.round(coordY / cluster.points.length);
            
            cluster.x = coordX;
            cluster.y = coordY;
        });
    }

    function animated(x, y, cluster) { //старые координаты и кластер с новыми координатами
        // анимировать движение кластеров к новым координатам

    }

   
    board.addEventListener("click", function(e) {
        let p = document.createElement("div");
        let pointId = "point" + allPoints.length;
        p.className = "point";
        p.id = pointId;
        p.style.left = e.pageX + "px";
        p.style.top = e.pageY + "px";
        board.appendChild(p);  
    
        allPoints.push({
            x: e.pageX,
            y: e.pageY,
            id: pointId,
            cluster: 0
        });
    })

})


