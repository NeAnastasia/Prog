"use strict";

window.addEventListener("DOMContentLoaded", function()
{
    var board = document.querySelector("div.workspace");
    board.addEventListener("click", function(e)
    {
        let what = document.getElementById("radio1").checked ? "point" : "cluster";
        let p = document.createElement("div");
        p.className = what;
        p.style.left = e.pageX + "px";
        p.style.top = e.pageY + "px";
        board.appendChild(p);        
    })
})

