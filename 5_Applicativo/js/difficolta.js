let difficolta;
function backcat(){
    close();
    var pag=window.open("categorie.html");
    
}

function start(){
    close();
    var pag=window.open("domande.html");
} 

function difx(x){
    let prendidifficolta=document.getElementById("difficolta"+x).innerHTML;
    sessionStorage.setItem("3",prendidifficolta);
    console.log(x);

   
}
function refreshdif(){
    difficolta = sessionStorage.getItem("3");

    document.getElementById("dif").innerHTML= difficolta;

}
