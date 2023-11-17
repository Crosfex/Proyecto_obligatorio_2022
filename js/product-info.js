let puntaje=0;
document.addEventListener("DOMContentLoaded", function(e){
    const urlObjeto = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
    const urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;
    query(urlObjeto).then(function(objeto){
        if(objeto.status === 'ok'){
            elementos = objeto.data;
            imprimirProducto(elementos);
            imprimirRelacionados(elementos);
        }
    })

    query(urlComentarios).then(function(objeto){
        if(objeto.status === 'ok'){
            comentarios(objeto.data);
        }
    })

    document.getElementById('boton').addEventListener("click", ()=>{
        let comentario = document.getElementById('campo').value;
        if(comentario === ''){
            return
        }else{
            const d = new Date();
            let contenidoHTML =`
            <div class="card p-3 mx-5">
            <div class="d-flex justify-content-between align-items-center">

            <div class="d-flex flex-row align-items-center">
  
            <span><small class="fw-bold fs-5 text-primary me-2">${localStorage.getItem('Email')}</small> <br> <small class="fw-bolder">${comentario}</small></span>
          
            </div>
            <div class="stars">
          
            </div>
            </div>
            <small>${d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth()+1)) + '-' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' +d.getSeconds()}</small>
        
            </div>
            `
            document.getElementById('comments').innerHTML += contenidoHTML;

            let divs = document.getElementsByClassName('stars');
            let estrellas = '';
            for(j=0;j<5;j++){
                if(j<puntaje){
                    estrellas+=`
                    <span class="fa fa-star checked"></span>
                    `
                }else{
                    estrellas+=`
                    <span class="fa fa-star"></span>
                    `
                }
                console.log(puntaje);
            }

            divs[divs.length - 1].innerHTML = estrellas;
        }
    })

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

})

function query(url){
    let result = {}
    showSpinner();
    return fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            throw Error(response.statusText);
        }
    })
    .then(function(response){
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
    })
    .catch(function(error) {
        result.status='error';
        result.data=error;
        hideSpinner();
        return result;
    })
}

function imprimirProducto(objeto){
    let contenidoAgregadoHtml="";
    let producto = objeto.products[localStorage.getItem("productIndex")];
    contenidoAgregadoHtml =`
        <div class="row">
        <h1 class="text-center">${producto.name}</h1>
        <hr>
          <div class="col-6 border">
          <p class="fw-bold fs-3 m-0">Precio:</p>
          <p class="fst-italic fs-4">U$D ${producto.cost}</p>
          <p class="fw-bold fs-3 m-0">Descripción:</p>
          <p class="fst-italic fs-4">${producto.description}</p>
          <p class="fw-bold fs-3 m-0">Categoria:</p>
          <p class="fst-italic fs-4">${objeto.catName}</p>
          <p class="fw-bold fs-3 m-0">Vendidos:</p>
          <p class="fst-italic fs-4">${producto.soldCount}</p>
            </div>
          <div class="col-6 text-center border">
            <p class="fw-bold fs-4">Imagenes del producto:</p>
            <img src="${producto.image}" alt="" class="img-fluid">
          </div>
        </div>
        `
    document.getElementById("productContainer").innerHTML += contenidoAgregadoHtml;
}

function imprimirRelacionados(array){
    let contenidoAgregadoHtml="";
    for(i=0; i<array.products.length; i++){
        if(i == localStorage.getItem('productIndex')){

        }else{
            let producto = array.products[i];
            contenidoAgregadoHtml+=`
            <div class="col-3" onclick="setProductIndex(${i}, ${producto.id})">
                <div class="border">
                    <img src="${producto.image}" alt="" class="img-fluid">
                    ${producto.name}
                </div>
            </div>
            `
        }
        
    }
    
    document.getElementById('relatedProductsContainer').innerHTML = contenidoAgregadoHtml;
}


function comentarios(array){
    let contenidoHTML='';
    let estrellas = '';
    for(i=0; i<array.length; i++){
        
        contenidoHTML +=`
        <div class="card p-3 mx-5">
        <div class="d-flex justify-content-between align-items-center">

        <div class="d-flex flex-row align-items-center">
  
        <span><small class="fw-bold fs-5 text-primary me-2">${array[i].user}</small> <br> <small class="fw-bolder">${array[i].description}</small></span>
          
        </div>
        <div class="stars">
          
        </div>
        </div>
        <small>${array[i].dateTime}</small>
        
        </div>
        `
    }   
    document.getElementById('comments').innerHTML = contenidoHTML;

    let divs = document.getElementsByClassName('stars');
    console.log(divs[0]);
    for(i=0;i<divs.length;i++){
        for(j=0;j<5;j++){
            if(j<array[i].score){
                estrellas+=`
                <span class="fa fa-star checked"></span>
                `
            }else{
                estrellas+=`
                <span class="fa fa-star"></span>
                `
            }
        }

        divs[i].innerHTML = estrellas;
        estrellas='';
    }
    
}

function asignarEstrellas(cant){
    puntaje = cant;
}

function setProductIndex(index, id){
    localStorage.setItem("productIndex", index);
    localStorage.setItem("productID", id);
    window.location.reload();
}

/*
<h1>Nombre del articulo</h1>
      <hr>
      <p class="fw-bold fs-4 m-0">Precio:</p>
      <p class="fst-italic fs-5">Inserte precio aqui</p>
      <p class="fw-bold fs-4 m-0">Descripción:</p>
      <p class="fst-italic fs-5">Inserte descripcion aqui</p>
      <p class="fw-bold fs-4 m-0">Categoria:</p>
      <p class="fst-italic fs-5">Inserte categoria aqui</p>
      <p class="fw-bold fs-4 m-0">Vendidos:</p>
      <p class="fst-italic fs-5">Inserte ventas aqui</p>
      <p class="fw-bold fs-4 m-0 text-center">Imagen del producto:</p>
      <div class="d-flex justify-content-center">
        <div class="row">
          <div class="col-12">
            <img src="https://http.cat/404" alt="">
          </div>
        </div>
      </div>
*/