document.addEventListener("DOMContentLoaded", function(){
    const categoriesMenu = document.getElementById('categoriesMenu');
    const catLeftArrow = document.getElementById('catLeftArrow');
    const catRightArrow = document.getElementById('catRightArrow');
    function scrollCategorias(dx, btn) {
        categoriesMenu.scrollBy({ left: dx, behavior: 'smooth' });
        // Efecto rebote flecha
        btn.classList.remove('bounce');
        void btn.offsetWidth; // trigger reflow
        btn.classList.add('bounce');
    }
    catLeftArrow.onclick = () => scrollCategorias(-120, catLeftArrow);
    catRightArrow.onclick = () => scrollCategorias(120, catRightArrow);

    function updateArrows() {
        if(categoriesMenu.scrollWidth <= categoriesMenu.clientWidth){
            catLeftArrow.style.display = catRightArrow.style.display = 'none';
        } else {
            catLeftArrow.style.display = catRightArrow.style.display = '';
        }
    }
    window.addEventListener('resize', updateArrows);
    setTimeout(updateArrows, 500);
});