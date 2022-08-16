document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('btn');
    const email = document.getElementById('email');
    const contrasenia = document.getElementById('password');
    const logo = document.getElementById('logo');

    logo.addEventListener('click', ()=>{
        window.location.href="index.html";
    })

    btn.addEventListener('click', ()=>{
        if(email.value != '' && contrasenia != ''){
            window.location.href="home.html";
        }
    })
})