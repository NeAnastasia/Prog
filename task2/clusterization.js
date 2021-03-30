window.addEventListener("DOMContentLoaded", function() 
{
    let allPoints = []; // объекты. координаты, id, массив точек
    let allClusters = []; // объекты. координаты, id
    let board = document.querySelector("div.workspace");

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
    }

    function newClusterPlace() {
        // рассчитать средние координаты в каждом кластере
        // это новые координаты для кластера
    }

    function animated() {
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
            id: pointId
        });
    })


})


