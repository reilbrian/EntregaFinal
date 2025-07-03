document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");

    const renderizarCarrito = () => {
        contenedorCarrito.innerHTML = "";

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = "<p class='mensaje-carrito'>El carrito está vacío.</p>";
            resumenCarrito.innerHTML = "";
            actualizarContador();
            return;
        }

        carrito.forEach((producto, index) => {
            const productoDiv = document.createElement("article");
            productoDiv.classList.add("producto-carrito");

            const imagen = document.createElement("img");
            imagen.src = producto.images[0];

            const titulo = document.createElement("h3");
            titulo.textContent = producto.title;

            const precio = document.createElement("p");
            precio.textContent = `$${producto.price}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => {
                alert(`${producto.title} eliminado del carrito`);
                eliminarProducto(producto);
            });

            productoDiv.appendChild(imagen);
            productoDiv.appendChild(titulo);
            productoDiv.appendChild(precio);
            productoDiv.appendChild(btnEliminar);

            contenedorCarrito.appendChild(productoDiv);
        });

        renderizarResumen();
        actualizarContador();
    };

    const eliminarProducto = (index) => {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    };

    const renderizarResumen = () => {
        const total = carrito.reduce((acc, prod) => acc + prod.price, 0);

        resumenCarrito.innerHTML = `
            <h3>Resumen de compra</h3>
            <p>Total de productos: ${carrito.length}</p>
            <p>Total a pagar: $${total}</p>
        `;
    };

    const actualizarContador = () => {
        contadorCarrito.textContent = carrito.length;
    };

    renderizarCarrito();
});
