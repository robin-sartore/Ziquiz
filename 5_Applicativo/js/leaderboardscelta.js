let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function Personale(){
    close();
    var pag=window.open("leaderboardpersonale.html");
} 
function Generale(){
    close();
    var pag=window.open("categorieleader.html");
    

    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("leadercat");
    document.getElementById("cat").innerHTML= cat;
  
}
