let puntaje=0;
document.addEventListener("DOMContentLoaded", function(e){
    const urlObjeto = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
    const urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;
    query(urlObjeto).then(function(objeto){
        if(objeto.status === 'ok'){
            elementos = objeto.data;
            imprimir(elementos);
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

function imprimir(objeto){
    let contenidoAgregadoHtml="";
    let producto = objeto.products[localStorage.getItem("productIndex")];
    contenidoAgregadoHtml =`
        <div class="row">
          <h1 class="text-center">${producto.name}</h1>
          <hr>
          <p class="fw-bold fs-4 m-0">Precio:</p>
          <p class="fst-italic fs-5">U$D ${producto.cost}</p>
          <p class="fw-bold fs-4 m-0">Descripción:</p>
          <p class="fst-italic fs-5">${producto.description}</p>
          <p class="fw-bold fs-4 m-0">Categoria:</p>
          <p class="fst-italic fs-5">${objeto.catName}</p>
          <p class="fw-bold fs-4 m-0">Vendidos:</p>
          <p class="fst-italic fs-5">${producto.soldCount}</p>
            
          <div class="col-6 text-center position-absolute start-50 mt-5">
            <p class="fw-bold fs-4">Imagenes del producto:</p>
            <img src="${producto.image}" alt="" width="500px" height="300px" class="">
          </div>
        </div>
        `
    document.getElementById("container").innerHTML += contenidoAgregadoHtml;
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

function agregarComentario(){

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