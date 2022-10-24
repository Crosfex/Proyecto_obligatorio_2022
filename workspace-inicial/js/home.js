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
        <div class="dropdown">
            <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown">
                ${localStorage.getItem('Email')}
            </button>

            <ul class="dropdown-menu dropdown-menu-dark">
                <li><a href="cart.html" class="dropdown-item">Mi carrito</a></li>
                <li><a href="my-profile.html" class="dropdown-item">Mi perfil</a></li>
                <li><a class="dropdown-item" onclick=logOut()>Cerrar sesion</a></li>
            </ul>
            <img src="img/img_perfil.png" width="30px" height="30px" class="mt-1">
        </div>
        
    `;

});