document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    document.getElementById('user').innerHTML=`
        <a class="nav-link">${localStorage.getItem('Email')}</a>
        <img src="img/img_perfil.png" width="30px" height="30px" class="mt-1">
    `;

});