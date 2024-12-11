function checklgbt(){
    nick = sessionStorage.getItem("1");
    if(nick==""||nick==null){
        document.getElementById("logoutButton").style.visibility = "hidden";
        document.getElementById("logoutButton").disabled = true;
        document.getElementById("loginButton").style.visibility= "visible";
        document.getElementById("loginButton").disabled = false; 
    }
    else{
        document.getElementById("loginButton").style.visibility = "hidden";
        document.getElementById("loginButton").disabled = true;
        document.getElementById("logoutButton").style.visibility= "visible";
        document.getElementById("logoutButton").disabled = false;

    }
}