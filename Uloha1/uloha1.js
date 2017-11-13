var meno;
var priezvisko;
var dn;
var pohl;
var persons = [];
var data;
var i;

function pridat() {
    var obj = {};
    obj["meno"]=meno;
    obj["priezvisko"]=priezvisko;
    obj["dn"]=dn;
    obj["muz"]=pohl;
    i=persons.push(obj);
    $("#output").show();
    $('#output tr:last').after('<tr><td>'+obj.meno+'</td><td>'+obj.priezvisko+'</td><td>'+obj.dn+'</td><td></td></tr>');
    console.log("dlzka pola: "+i);
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
        persons = JSON.parse(localStorage["persons"]);
        $("#output").show();
        console.log("Persons: "+persons.length);
        console.log(persons);
        $('#output tbody').empty();
        var pLen = persons.length;
        for (i=0; i<pLen; i++){
            console.log(persons[i]);
            $('#output tbody').append('<tr><td>'+persons[i].meno+'</td><td>'+persons[i].priezvisko+'</td><td>'+persons[i].dn+'</td><td><img src="delete.png" height="20" id="del'+i+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                alert(this.id);
            });
        }
    } else {
        document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function filtruj(){
    var filter = document.getElementById("mpohlavie").value;
    var pLen = persons.length;
    var pFiltered = [];
    switch (filter){
        case "mm":
            for (var j=0; j<pLen; j++){
                if (persons[j].muz == true){
                    pFiltered.push(persons[j]);
                }
            }
            break;
        case "mz":
            for (var j=0; j<pLen; j++){
                if (persons[j].muz == false){
                    pFiltered.push(persons[j]);
                }
            }
            break;
        case "mmz":
            console.log("muzi+zeny");
            pFiltered = persons.slice(0);
            break;
    }
    var age = document.getElementById("showAge").checked;
    prepisTabulku(pFiltered, age);
}

function prepisTabulku(pole, vek){
    $('#output tbody').empty();
    if (vek){
        for (var j=0; j<pole.length; j++){
            console.log(j, pole[j].length, pole[j]);
            var pVek = pole[j].dn;
            console.log(pVek);
            $('#output tbody').append('<tr><td>'+pole[j].meno+'</td><td>'+pole[j].priezvisko+'</td><td>'+pole[j].dn+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                alert(this.id);
            });
        }
    }
    else{
        for (var j=0; j<pole.length; j++){
            console.log(j, pole[j].length, pole[j]);
            $('#output tbody').append('<tr><td>'+pole[j].meno+'</td><td>'+pole[j].priezvisko+'</td><td>'+pole[j].dn+'</td><td><img src="delete.png" height="20" id="del'+j+'"></td></tr>');
            $('#output tbody').on('click', '#del'+i, function(){
                alert(this.id);
            });
        }
    }
}

function ukazVek(checkbox){
    if (checkbox.checked){
        console.log('vek');
        prepisTabulku(pFiltered, checkbox.checked);
    }
    else {
        console.log('datum');
        prepisTabulku(pFiltered, checkbox.checked);
    }
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