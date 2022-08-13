document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('btn');
    const email = document.getElementById('email');
    const contrasenia = document.getElementById('password');

    btn.addEventListener('click', ()=>{
        if(email.value != '' && contrasenia != ''){
            window.location.href="index.html";
        }
    })
})