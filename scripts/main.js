window.addEventListener('load', () => {

    const isMobile = window.innerWidth <= 1024;
    const feed = document.getElementById('feed');
    const items = Array.from(feed.children);

    const INTERVAL = 2500; // tiempo entre cambios
    const FADE_TIME = 500; // debe coincidir con CSS

    function randomPosition(item) {
        const maxX = (window.innerWidth - item.clientWidth);
        const maxY = (window.innerHeight - item.clientHeight);
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        return { x, y };
    }

    items.forEach(item => {
        let isHovered = false; // flag para hover

        // posición inicial
        const pos = randomPosition(item);
        item.style.opacity = 0;
        item.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

        // detectar hover
        if (!isMobile) {
            item.addEventListener('mouseenter', () => { isHovered = true; });
            item.addEventListener('mouseleave', () => { isHovered = false; });
        }

        // función de animación recursiva
        function animate() {
            if (!isHovered) {
                // fade out con desincronización
                const fadeOutDelay = Math.random() * 500;
                setTimeout(() => {
                    item.style.opacity = 0;
                }, fadeOutDelay);

                // mover y fade in
                const moveDelay = FADE_TIME + Math.random() * 500;
                setTimeout(() => {
                    const pos = randomPosition(item);
                    item.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
                    item.style.opacity = 1;
                }, moveDelay);
            }

            // siguiente animación
            setTimeout(animate, INTERVAL);
        }

        animate();
    });

    // const listItems = Array.from(document.querySelectorAll('#list p'));

    // items.forEach(item => {
    //     const index = item.dataset.index;

    //     item.addEventListener('mouseenter', () => {
    //         listItems.forEach(p => p.classList.remove('is-active'));
    //         const active = document.querySelector(`#list p[data-index="${index}"]`);
    //         if (active) active.classList.add('is-active');
    //     });

    //     item.addEventListener('mouseleave', () => {
    //         listItems.forEach(p => p.classList.remove('is-active'));
    //     });
    // });
    // const listItems = Array.from(document.querySelectorAll('#feed p'));
    const categories = Array.from(document.querySelectorAll('#cat p'));

    items.forEach(item => {

        if (isMobile) return;

        item.addEventListener('mouseenter', function () {
            this.querySelector('p').classList.add('is-active');

            categories.forEach(cat => cat.classList.remove('active'));
            const catName = this.dataset.category;
            const catEl = document.querySelector(`#cat p[data-category="${catName}"]`);
            if (catEl) catEl.classList.add('active');
        });

        item.addEventListener('mouseleave', function () {
            this.querySelector('p').classList.remove('is-active');
            
            categories.forEach(cat => {
                // si hay una categoría activa por click, no tocarla
                if (activeCategory) return;
                cat.classList.remove('active');
            });
        });
    });

    // clock

    // const clock = document.getElementById('clock');

    // function updateClock() {
    //     const now = new Date();

    //     const hours = String(now.getHours()).padStart(2, '0');
    //     const minutes = String(now.getMinutes()).padStart(2, '0');
    //     const seconds = String(now.getSeconds()).padStart(2, '0');

    //     clock.textContent = `${hours}:${minutes}:${seconds}`;
    // }

    // updateClock();

    // setInterval(updateClock, 1000);

    // Seleccionamos todas las categorías
// const categories = document.querySelectorAll("#cat p");
const feedItems = document.querySelectorAll("#feed > div");


let activeCategory = null;

document.addEventListener('click', (e) => {
    // si el click viene de una categoría, no hacer nada (ya se gestiona en su handler)
    if (e.target.closest('#cat')) return;

    // desactivar filtro
    activeCategory = null;

    // limpiar estado visual de categorías
    categories.forEach(c => c.classList.remove('active'));

    // limpiar estado de items
    feedItems.forEach(item => {
        item.classList.remove('is-filtered');
    });
});

categories.forEach(cat => {
    cat.addEventListener("click", () => {
        const selectedCategory = cat.dataset.category;

        activeCategory = activeCategory === selectedCategory ? null : selectedCategory;

        // reset estado visual de categorías
        categories.forEach(c => c.classList.remove('active'));

        // activar categoría clicada si hay filtro activo
        if (activeCategory) {
            cat.classList.add('active');
        }

        feedItems.forEach(item => {
            item.classList.remove('is-filtered');

            if (activeCategory && item.dataset.category !== activeCategory) {
                item.classList.add('is-filtered');
            }
        });
    });
});
});
