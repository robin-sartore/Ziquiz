function gioca(){
  nick = sessionStorage.getItem("1");
  if(nick==""||nick==null){
    alert("Senza Accesso non verra salvato nessun record");
  }
    close();
    var cat=window.open("categorie.html");
    
}
function crea(){
  nick = sessionStorage.getItem("1");
  if(nick==""||nick==null){
    alert("Senza Accesso non puoi creare quiz");
  }
  else{
    close();
    var cat=window.open("crea.html");
  }
    
}
function accesso(){
  
    close();
    var cat=window.open("accesso.html");
  
}
function leaderboard(){
  close();
  var leader=window.open("sceltaLeaderboard.html")
}