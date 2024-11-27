let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function dif(){
    close();
    var pag=window.open("leaderboarddif.html");
} 
function categoria(x){
    const prendicategoria = document.getElementById("categoria"+x).innerHTML;
    sessionStorage.setItem("leadercat",prendicategoria);


    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("leadercat");
    document.getElementById("cat").innerHTML= cat;
  
}
