// Modo Claro/Oscuro
const botonModoOscuro = document.getElementById("modoOscuro");
const body = document.body;

botonModoOscuro.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

// Validación del Formulario
document.getElementById("pedidoForm").addEventListener("submit", function (event) {
    let valido = true;
    let errores = [];

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    if (nombre === "") {
        errores.push("El nombre es obligatorio.");
        valido = false;
    }
    if (!/^\d{9,}$/.test(telefono)) {
        errores.push("El teléfono debe contener al menos 9 dígitos numéricos.");
        valido = false;
    }
    if (!email.includes("@")) {
        errores.push("El email debe contener '@'.");
        valido = false;
    }
    if (direccion.length < 30) {
        errores.push("La dirección debe tener al menos 30 caracteres.");
        valido = false;
    }

    if (!valido) {
        event.preventDefault();
        alert("Errores en el formulario:\n" + errores.join("\n"));
    } else {
        if (!confirm("¿Deseas enviar tu pedido?")) {
            event.preventDefault();
        }
    }
});

// Contador de Caracteres en Instrucciones Adicionales
const instrucciones = document.getElementById("instrucciones");
const contador = document.getElementById("contador");

instrucciones.addEventListener("input", function () {
    let longitud = instrucciones.value.length;
    contador.textContent = `${longitud}/200`;

    if (longitud > 200) {
        instrucciones.value = instrucciones.value.substring(0, 200);
        contador.textContent = "200/200";
    }
});

// Cálculo del Precio del Pedido
const precios = {
    "clasica": 5,
    "doble": 7,
    "vegetariana": 6,
    "extra": 1
};

const calcularTotal = () => {
    let tipoHamburguesa = document.getElementById("tipo").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let extras = document.querySelectorAll("input[name='extra']:checked");
    let precioBase = precios[tipoHamburguesa] || 0;
    let precioExtras = extras.length * precios.extra;
    let total = (precioBase + precioExtras) * cantidad;
    
    document.getElementById("total").textContent = `Total: ${total} €`;
};

// Eventos para actualizar precio
document.getElementById("tipo").addEventListener("change", calcularTotal);
document.getElementById("cantidad").addEventListener("change", calcularTotal);
document.querySelectorAll("input[name='extra']").forEach(extra => {
    extra.addEventListener("change", calcularTotal);
});

// Efecto en el Botón "Enviar Pedido"
const botonEnviar = document.getElementById("enviar");

botonEnviar.addEventListener("mouseover", function () {
    botonEnviar.style.backgroundColor = "#ffcc00";
    botonEnviar.style.color = "#000";
});

botonEnviar.addEventListener("mouseout", function () {
    botonEnviar.style.backgroundColor = "#28a745";
    botonEnviar.style.color = "#fff";
});
