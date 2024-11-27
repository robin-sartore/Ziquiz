let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function personale(){
    close();
    var pag=window.open("leaderboardpersonale.html");
} 
function generale(){
    const prendicategoria = document.getElementById("categoria"+x).innerHTML;
    sessionStorage.setItem("leadercat",prendicategoria);


    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("leadercat");
    document.getElementById("cat").innerHTML= cat;
  
}
