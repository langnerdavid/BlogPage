let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');

searchButton,addEventListener('click', addAnimation);
function addAnimation(){
    searchInput.classList.add('searchInputAnimation');
    searchInput.focus();
}