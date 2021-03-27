function CreateField(){
    let n = parseInt(document.getElementById('vvod').value);
    let DrawField = document.getElementById('FMap');
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++){
                let Cell = document.createElement("div"); 
                Cell.className = "block";
               Cell.style["grid-column-start"]=j+1;
              DrawField.appendChild(Cell);
            }
        }
}
