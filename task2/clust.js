window.addEventListener("DOMContentLoaded", function() 
{
    let allPoints = []; // объекты. координаты (x, y), кластер (cluster)

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    canvas.addEventListener("click", function(e) {
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        context.beginPath();
        context.arc(x, y, 3, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.fill();
        context.stroke();

        allPoints.push({
            x: x,
            y: y
        });

        console.log(allPoints);
    })
})

