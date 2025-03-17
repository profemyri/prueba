document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const totalSpan = document.getElementById("precioTotal");
    const instrucciones = document.getElementById("instrucciones");
    const contador = document.getElementById("contador");
    const btnOscuro = document.getElementById("modoOscuro");

    btnOscuro.onclick = () => {
        document.body.classList.toggle("dark-mode");
        btnOscuro.innerText = document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro";
    };

    instrucciones.oninput = () => {
        contador.textContent = `${instrucciones.value.length}/200 caracteres`;
    };

    const calcularTotal = () => {
        let precio = Number(document.getElementById("tipoBurger").value);
        let extras = document.querySelectorAll(".extra:checked").length;
        if (extras < 2) extras = 2;
        let cantidad = Number(document.getElementById("cantidad").value);
        let total = (precio + extras) * cantidad;
        totalSpan.textContent = `${total}€`;
        return total;
    };

    document.querySelectorAll("input, select").forEach(el => {
        el.onchange = calcularTotal;
    });

    form.onsubmit = (e) => {
        const nombre = document.getElementById("nombre").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();

        if(nombre === "" || direccion.length < 20 || !/^\d{9,}$/.test(telefono) || !email.includes("@")) {
            alert("⚠️ Hay errores en los campos obligatorios, revísalos.");
            e.preventDefault();
        } else if(confirm("🍔 ¿Quieres confirmar y enviar tu pedido ahora?")) {
            alert(`🍔 ¡Gracias por tu pedido, ${nombre}! Pronto lo tendrás listo.`);
        } else {
            e.preventDefault();
        }
    };

    calcularTotal();
});
