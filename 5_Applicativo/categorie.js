let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function dif(){
    close();
    var pag=window.open("difficolta.html");
} 
function categoria(x){
    const prendicategoria = document.getElementById("categoria"+x).innerHTML;
    sessionStorage.setItem("2",prendicategoria);

    cat = sessionStorage.getItem("2");

    
   
}
function refreshcat(){
    cat = sessionStorage.getItem("2");
    console.log(cat);

    document.getElementById("cat").innerHTML= cat;

}
