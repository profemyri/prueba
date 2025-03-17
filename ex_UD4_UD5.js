document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("pedidoForm");
  const instrucciones = document.getElementById("instrucciones");
  const contador = document.getElementById("contador");
  const totalPedido = document.getElementById("totalPedido");
  const botonOscuro = document.getElementById("modoOscuro");
  const botonEnviar = document.getElementById("enviar");

  // Cambio modo oscuro y texto botón
  botonOscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    botonOscuro.innerText = document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro";
  });

  // Contador caracteres
  instrucciones.addEventListener("input", () => {
    contador.innerText = `${instrucciones.value.length} / 200 caracteres`;
  });

  // Cálculo total
  const calcularTotal = () => {
    let precioBurger = parseInt(document.getElementById("tipoBurger").value);
    let ingredientes = document.querySelectorAll(".ingrediente:checked").length;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = (precioBurger + ingredientes) * cantidad;
    totalPedido.textContent = total + "€";
    return total;
  };

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", calcularTotal);
  });

  // Validación formulario
  form.addEventListener("submit", (event) => {
    let nombre = document.getElementById("nombre").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();

    if(nombre === "" || direccion.length < 15 || !/^\d{9,}$/.test(telefono) || !email.includes("@")) {
      alert("⚠️ Revisa el formulario: algunos campos son incorrectos o están incompletos.");
      event.preventDefault();
      botonEnviar.disabled = true;
    } else {
      botonEnviar.disabled = false;
      if(confirm("🍔 ¿Quieres confirmar y enviar tu pedido ahora?")){
        alert(`🍔 ¡Gracias por tu pedido, ${nombre}! Pronto lo tendrás listo. 😊`);
      } else {
        event.preventDefault();
      }
    }
  });

  // Inicializa cálculo
  calcularTotal();
});
