let productos = [];
let carrito = [];

function cargarProductos() {
    fetch('productos.json')
        .then(res => res.json())
        .then(data => {
            productos = data;
            cargarCategorias();
            mostrarProductos(productos);
        });
}

function cargarCategorias() {
    const select = document.getElementById('categoryFilter');
    const categorias = [...new Set(productos.map(p => p.categoria))];
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function mostrarProductos(lista) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    lista.forEach(prod => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${prod.imagen}" alt="${prod.nombre}" class="product-image">
                <div class="product-content">
                    <div class="product-name">${prod.nombre}</div>
                    <div class="product-description">${prod.descripcion}</div>
                </div>
                <div class="product-footer">
                    <div class="product-price">$${prod.precio}</div>
                    <button class="add-to-cart" onclick="agregarAlCarrito('${prod.nombre}')">Añadir</button>
                </div>
            </div>
        `;
    });
}

document.getElementById('searchBtn').onclick = filtrarProductos;
document.getElementById('categoryFilter').onchange = filtrarProductos;

function filtrarProductos() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    let filtrados = productos;
    if (cat) filtrados = filtrados.filter(p => p.categoria === cat);
    if (query) filtrados = filtrados.filter(p => 
        p.nombre.toLowerCase().includes(query) || 
        p.descripcion.toLowerCase().includes(query)
    );
    mostrarProductos(filtrados);
}

window.agregarAlCarrito = function(nombre) {
    const prod = productos.find(p => p.nombre === nombre);
    if (!prod) return;
    const item = carrito.find(i => i.nombre === prod.nombre);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    actualizarCarrito();
};

function actualizarCarrito() {
    document.getElementById('cartCount').textContent = carrito.reduce((a, i) => a + i.cantidad, 0);
    const cartItems = document.getElementById('cartItems');
    if (carrito.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío 🛒</div>';
    } else {
        cartItems.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <span>${item.nombre} x ${item.cantidad}</span>
                <span>$${item.precio * item.cantidad}</span>
                <button class="remove-item" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
            </div>
        `).join('');
    }
    document.getElementById('cartTotal').textContent = '$' + carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);
}

window.eliminarDelCarrito = function(nombre) {
    carrito = carrito.filter(i => i.nombre !== nombre);
    actualizarCarrito();
};

document.getElementById('cartBtn').onclick = function() {
    document.getElementById('cartModal').style.display =