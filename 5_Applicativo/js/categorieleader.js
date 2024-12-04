let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function dif(){
    close();
    var pag=window.open("difficoltaleader.html");
} 
function categoria(x){
    const prendicategoria = document.getElementById("categoria"+x).innerHTML;
    sessionStorage.setItem("catlead",prendicategoria);


    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("catlead");
    document.getElementById("cat").innerHTML= cat;
  
}
