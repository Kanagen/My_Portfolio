const openBtn = document.querySelector('.sideBar_hamburger');
const closeBtn = document.querySelector('.sideBar_close');
const sideBar = document.querySelector('.sideBar');

openBtn.addEventListener('click', function(){
    sideBar.classList.add('sideBar--opened');
});
closeBtn.addEventListener('click', function(){
    sideBar.classList.remove('sideBar--opened');
})