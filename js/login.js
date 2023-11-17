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
            localStorage.setItem('Email', email.value);
            localStorage.setItem('Password', contrasenia.value);
            window.location.href="home.html";
        }
    })
})