let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function Personale(){
    nick = sessionStorage.getItem("1");
    if(nick==""||nick==null){
      alert("Senza Accesso non è possibile vedere questa pagina");
    }
    else{
        close();
        var pag=window.open("leaderboardpersonale.html");
    }
   
} 
function Generale(){
    close();
    var pag=window.open("categorieleader.html");
    

    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("leadercat");
    document.getElementById("cat").innerHTML= cat;
  
}
