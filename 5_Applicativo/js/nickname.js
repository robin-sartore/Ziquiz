let nick;    

function insert(){


    const prendinickname = document.getElementById("insertnickname").value;

    if(prendinickname=="")
        {

            alert("Inserire nickname");
         }
         else{

            sessionStorage.setItem("1",prendinickname);

            nick = sessionStorage.getItem("1");
    
            close();
            var cat=window.open("Ziquiz.html");

            

         }
    
    

    
}
    function refresh(){
    nick = sessionStorage.getItem("1");
    document.getElementById("nicknamefinal").innerHTML= nick;

}

