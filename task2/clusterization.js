function getPosition(e)
{
    let x = y = 0;

}


window.addEventListener("DOMContentLoaded", function()
{
    var board = document.querySelector("div.workspace");
    board.addEventListener("click", function(e)
    {
        let point = document.createElement("div");
        point.className = "point";
        point.style.left = e.pageX + "px";
        point.style.top = e.pageY + "px";
        board.appendChild(point);
    })
})