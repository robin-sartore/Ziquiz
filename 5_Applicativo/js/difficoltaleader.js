let difficolta;
function backcat(){
    close();
    var pag=window.open("categorieleader.html");
    
}

function start(){
    close();
    var pag=window.open("leaderboardfinale.html");
} 

function difx(x){
    let prendidifficolta=document.getElementById("difficolta"+x).innerHTML;
    sessionStorage.setItem("diflead",prendidifficolta);
    console.log(x);

   
}

