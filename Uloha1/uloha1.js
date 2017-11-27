var meno;
var priezvisko;
var dn;
var pohl;
var persons = [];
var data;
var i;
var isFiltered = false;
var pFiltered;
const canvasWidth = 800;
const canvasHeight = 400;

function pridat() {
    var obj = {};
    obj["meno"]=meno;
    obj["priezvisko"]=priezvisko;
    obj["dn"]=dn;
    obj["muz"]=pohl;
    obj["id"]=persons.length+1;
    var dob = new Date(dn);
    var today = new Date();
    if (today.getMonth() > dob.getMonth() || (today.getMonth() == dob.getMonth()) && today.getDate() >= dob.getDate()){
        var age = today.getFullYear() - dob.getFullYear();
    }
    else {
        var age = (today.getFullYear() - dob.getFullYear()) - 1;
    }
    obj["vek"]=age;
    i=persons.push(obj);
    $("#output").show();
    $('#output tr:last').after('<tr><td>'+obj.meno+'</td><td>'+obj.priezvisko+'</td><td>'+obj.dn+'</td><td></td></tr>');
    console.log("id = "+obj.id);
}

function validacia() {
    meno = document.getElementById("meno").value;
	meno = meno.trim();
    priezvisko = document.getElementById("priezvisko").value;
    priezvisko = priezvisko.trim();
   
    dn = document.getElementById("dn").value;
    var dnes = new Date();
    var dnar = new Date(dn);
 
    if (document.getElementById("m").checked){
        pohl = true;
    }
    else{
        pohl = false;
    }

    if (meno.length<2){
        valResult(1);
    }
    else if (priezvisko.length<2){
        valResult(2);
    }
    else if (dnes<dnar){
        valResult(3);
    }
    else {
         valResult(0);
    }
}

function valResult(res){
    console.log("valResult = "+res);
    /*var errorm = document.getElementById("errorm").innerHTML;
    var errorp = document.getElementById("errorp").innerHTML;
    var errordn = document.getElementById("errordn").innerHTML;*/
    
    switch(res){
        case 1:
            document.getElementById("errorm").innerHTML = "Meno musí mať minimálne 2 znaky";
            //errorm = "Meno musí mať minimálne 2 znaky";
            break;
        case 2:
            document.getElementById("errorp").innerHTML = "Priezvisko musí mať minimálne 2 znaky";
            break;
        case 3:
            document.getElementById("errordn").innerHTML = "Dátum narodenia nesmie byť neskôr ako dnešný dátum";
            break;
        case 0:
            pridat();
    }
}

function save(){
    if (typeof(Storage) !== "undefined") {
        localStorage["persons"]=JSON.stringify(persons);
    } else {
        document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function load(){
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("persons") === null){

        }
        else {
            persons = JSON.parse(localStorage["persons"]);
            $("#output").show();
            console.log("Persons: "+persons.length);
            console.log(persons);
            $('#output tbody').empty();
            var pLen = persons.length;
            for (i=0; i<pLen; i++){
                $('#output tbody').append('<tr><td>'+persons[i].meno+'</td><td>'+persons[i].priezvisko+'</td><td>'+persons[i].dn+'</td><td><img src="delete.png" height="20" id="del'+i+'"></td></tr>');
                $('#output tbody').on('click', '#del'+i, function(){
                    alert(this.id);
                });
            }
        }
    } else {
        document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function filtruj(){
    var filter = document.getElementById("mpohlavie").value;
    var pLen = persons.length;
    pFiltered = [];
    switch (filter){
        case "mm":
            for (var j=0; j<pLen; j++){
                if (persons[j].muz == true){
                    pFiltered.push(persons[j]);
                }
            }
            isFiltered = true;
            break;
        case "mz":
            for (var j=0; j<pLen; j++){
                if (persons[j].muz == false){
                    pFiltered.push(persons[j]);
                }
            }
            isFiltered = true;
            break;
        case "mmz":
            pFiltered = persons.slice(0);
            isFiltered = false;
            break;
    }
    var age = document.getElementById("showAge").checked;
    prepisTabulku(pFiltered, age);
}

function prepisTabulku(pole, vek){
    $('#output tbody').empty();
    if (vek){
        for (var j=0; j<pole.length; j++){
            $('#output tbody').append('<tr><td>'+pole[j].meno+'</td><td>'+pole[j].priezvisko+'</td><td>'+pole[j].vek+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                alert(this.id);
            });
        }
    }
    else{
        for (var j=0; j<pole.length; j++){
            $('#output tbody').append('<tr><td>'+pole[j].meno+'</td><td>'+pole[j].priezvisko+'</td><td>'+pole[j].dn+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                alert(this.id);
            });
        }
    }
}

function ukazVek(checkbox){
    prepisTabulku(isFiltered ? pFiltered : persons, checkbox.checked);
}

function sortTable(){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("output");
    switching = true;
    dir = "asc";
    
    // table.getElementsByTagName("TH")[2].classList.remove("headerSortDown");
    // table.getElementsByTagName("TH")[2].classList.add("headerSortUp");

    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[2];
          y = rows[i + 1].getElementsByTagName("TD")[2];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            // table.getElementsByTagName("TH")[2].classList.remove("headerSortUp");
            // table.getElementsByTagName("TH")[2].classList.add("headerSortDown");
            switching = true;
          }
        }
      }
}

function graph(){
    var c = document.getElementById("canvas");
    document.getElementsByClassName("graf")[0].style.display = "block";
    //c.style.display = "block";
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //vykreslit hodnoty
    ctx.beginPath();
    ctx.moveTo(0,canvasHeight);
    ctx.strokeStyle="black";

    var pLen = persons.length;
    var dx = canvasWidth/(pLen+1);
    for (var j=0, x=dx; j<pLen; j++, x+=dx) {
        var y = canvasHeight-((persons[j].vek/100)*canvasHeight);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    //vykreslit priemer
    document.getElementById("priemer").innerHTML="Priemerný vek = "+priemernyVek(persons);
    var priemer = (priemernyVek(persons)/100)*canvasHeight;
    ctx.beginPath();
    ctx.moveTo(0,canvasHeight-priemer);
    ctx.lineTo(canvasWidth,canvasHeight-priemer);
    ctx.strokeStyle="red";
    ctx.stroke(); 
}

function priemernyVek(pole){
    var pLen = pole.length;
    var suma = 0;
    for (var j=0; j<pLen; j++){
        suma+=pole[j].vek;
    }
    return Math.floor(suma/pLen);
}

$(document).ready(function(){
    $("#blue").click(function(){
        if ($("#text").hasClass("red")){
            $("#text").removeClass("red");
        }
        $("#text").addClass("blue");    
    });
    
    $("#red").click(function(){
        if ($("#text").hasClass("blue")){
            $("#text").removeClass("blue");
        }
        $("#text").addClass("red");    
    });

    $("#meno").keyup(function(event) {
        var fname=$("#meno").val();
        if(fname.trim().length>1){
            $("#errorm").html("");
        }
    });

    $("#priezvisko").keyup(function(event) {
        var lname=$("#priezvisko").val();
        if(lname.trim().length>1){
            $("#errorp").html("");
        }
    });

    $("#dn").change(function(event) {
        var dob = new Date($("#dn").val());
        var today = new Date();
        if(today>=dob){
            $("#errordn").html("");
        }
    });
})