let email = document.getElementById('email');
let pn = document.getElementById('primerNombre');
let sn = document.getElementById('segundoNombre');
let pa = document.getElementById('primerApellido');
let sa = document.getElementById('segundoApellido');
let telefono = document.getElementById('telefono');


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('Email') == null) {
        alert('Usted no se ha logueado, sera redirigido a la pagina de logueo');
        window.location.href = 'index.html'
    } else {
        pn.value = localStorage.getItem('primerNombre');
        sn.value = localStorage.getItem('segundoNombre');
        pa.value = localStorage.getItem('primerApellido');
        sa.value = localStorage.getItem('segundoApellido');
        telefono.value = localStorage.getItem('telefono');
        email.value = localStorage.getItem('Email');
    }


    document.getElementById('user').innerHTML = `
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

})



function perfil() {
    if (pn.value == '' || pa.value == '') {
        alert('Algo salio mal');
    } else {
        localStorage.setItem('primerNombre', pn.value);
        localStorage.setItem('segundoNombre', sn.value);
        localStorage.setItem('primerApellido', pa.value);
        localStorage.setItem('segundoApellido', sa.value);
        localStorage.setItem('telefono', telefono.value);
        localStorage.setItem('Email', email.value);
    }
}