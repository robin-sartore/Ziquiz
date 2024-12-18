let difficolta;
function backcat(){
    close();
    var pag=window.open("categorie.html");
    
}

function start(){
    close();
    var pag=window.open("domande.html");
} 
function startPer(nickname,difficolta){
    sessionStorage.setItem("autore",nickname);
    sessionStorage.setItem("3",difficolta)
    close();
    var pag=window.open("domandePub.html");
}
function difx(x){
    let prendidifficolta=document.getElementById("difficolta"+x).innerHTML;
    sessionStorage.setItem("3",prendidifficolta);
    console.log(x);

   
}
function refreshdif(){
    difficolta = sessionStorage.getItem("3");

    document.getElementById("dif").innerHTML= difficolta;
    if(difficolta=="FACILE"){
        document.getElementById("nrdomande").innerHTML= "1/10";
    }
    else if(difficolta=="MEDIO"){
        document.getElementById("nrdomande").innerHTML= "1/20";
    }
    else{
        document.getElementById("nrdomande").innerHTML= "1/30";
    }
}
