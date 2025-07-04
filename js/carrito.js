document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const accionesCarrito = document.getElementById("acciones-carrito");

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

            let btnEliminar = document.createElement("button");
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
        accionesBotones();
    };

    const eliminarProducto = (index) => {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    };

    const accionesBotones = () => {
        accionesCarrito.innerHTML = "";
         
        // Botón vaciar carrito
        let btnVaciar = document.createElement("button");
        btnVaciar.textContent = "Vaciar carrito";
        btnVaciar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
                carrito = [];
                localStorage.clear();
                renderizarCarrito();
            }
        });
        // Botón Comprar
        let btnComprar = document.createElement("button");
        btnComprar.textContent = "Comprar";
        btnComprar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de la compra?")) {
                carrito = [];
                localStorage.clear();
                window.location.href = "../index.html";
            }
        });

        accionesCarrito.appendChild(btnComprar)
        accionesCarrito.appendChild(btnVaciar);
        
    };

    const renderizarResumen = () => {
        const total = carrito.reduce((acc, prod) => acc + prod.price, 0);

        resumenCarrito.innerHTML = `
            <h3>Resumen de compra</h3>
            <p>Total de productos: ${carrito.length}</p>
            <p>Total a pagar: $${total}</p>
        `;
        let btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => {
                alert(`${producto.title} eliminado del carrito`);
                eliminarProducto(producto);
            });
        
    };

    const actualizarContador = () => {
        contadorCarrito.textContent = carrito.length;
    };

    renderizarCarrito();
});
