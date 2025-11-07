document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let esValido = true;

    const password = document.getElementById('password').value;
    const errorPassword = document.getElementById('errorPassword');
    if (password.length < 8) {
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        esValido = false;
    } else {
        errorPassword.textContent = '';
    }

    const telefono = document.getElementById('telefono').value;
    const errorTelefono = document.getElementById('errorTelefono');
    const telefonoRegex = /^\d{9}$|^\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
    if (!telefonoRegex.test(telefono)) {
        errorTelefono.textContent = 'El teléfono debe tener 9 dígitos (opcionalmente en el formato xxx xx xx xx).';
        esValido = false;
    } else {
        errorTelefono.textContent = '';
    }

    const aceptoDatos = document.getElementById('aceptoDatos').checked;
    if (!aceptoDatos) {
        esValido = false;
    }

    if (esValido) {
        document.getElementById('registroExitoso').style.display = 'block';
    } else {
        document.getElementById('registroExitoso').style.display = 'none';
        alert('Por favor, corrige los errores en el formulario.');
    }
});


function calcularPrecioTotal() {
    const precioBaseInput = document.getElementById('precioBase');
    const precioBase = parseFloat(precioBaseInput.value);
    
    const errorPrecio = document.getElementById('errorPrecio');
    
    if (isNaN(precioBase) || precioBase <= 0) {
        errorPrecio.textContent = 'Introduce un precio válido (mayor a 0).';
        document.getElementById('resultado').value = '';
        return;
    } else {
        errorPrecio.textContent = '';
    }
    
    const ivaSelect = document.getElementById('iva');
    const tasaIVA = parseFloat(ivaSelect.value);

    const precioTotal = precioBase * (1 + tasaIVA);

    document.getElementById('resultado').value = precioTotal.toFixed(2) + ' €';
}

document.getElementById('listaLibros').addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const precioLibro = selectedOption.getAttribute('data-precio');
    
    document.getElementById('precioBase').value = precioLibro;
});

document.addEventListener('DOMContentLoaded', function() {
    const listaLibros = document.getElementById('listaLibros');
    const primerPrecio = listaLibros.options[listaLibros.selectedIndex].getAttribute('data-precio');
    document.getElementById('precioBase').value = primerPrecio;
});