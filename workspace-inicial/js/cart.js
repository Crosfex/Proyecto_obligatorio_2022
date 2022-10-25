let articulos=[];
document.addEventListener("DOMContentLoaded", ()=>{
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
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            articulos = resultObj.data;
            imprimir(articulos.articles);
        }
    })
    defaultUser();
    
})



function imprimir(array){
    for(i=0; i<array.length;i++){
        let articulos = array[i];
        document.querySelector('#container').innerHTML+=`
        <div class="row text-center align-items-center">
        <img src="${articulos.image}" alt="auto" class="img-fluid col-1 ">
        <p class="col-3 ">${articulos.name}</p>
        <p class="col-3 ">${articulos.currency + articulos.unitCost}</p>
        <input type="number" id="inp${i}" value=1 class="col-3" placeholder="inserte cantidad">
        <p class="col-2"></p>
      </div>
      <hr>
        `
    }
}