document.addEventListener('DOMContentLoaded', function() {
    const crearSolpedForm = document.getElementById('crear-solped-form');

    crearSolpedForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const numeroMaterial = document.getElementById('numero-material').value.trim();
        const nombreMaterial = document.getElementById('nombre-material').value.trim();
        const cantidad = parseInt(document.getElementById('cantidad').value.trim());
        const almacen = document.getElementById('almacen').value.trim();

        if (numeroMaterial === '' || nombreMaterial === '' || isNaN(cantidad) || cantidad <= 0 || almacen === '') {
            mostrarMensaje('error', 'Por favor completa todos los campos correctamente.');
            return;
        }

        const codigoSolped = crearSolped(numeroMaterial, nombreMaterial, cantidad, almacen);

        if (codigoSolped) {
            mostrarMensaje('success', `SOLPED creada correctamente. Código: ${codigoSolped}`);
            crearSolpedForm.reset();
            registrarHistorial('Creación de SOLPED', `SOLPED creado: ${codigoSolped}`); // Registro en el historial
        } else {
            mostrarMensaje('error', 'Error al crear la SOLPED. Inténtalo de nuevo.');
        }

    });
});

function crearSolped(numeroMaterial, nombreMaterial, cantidad, almacen) {
    const codigoSolped = generarCodigoUnico();

    // Obtener SOLPEDs existentes del localStorage o inicializar un array vacío si no hay ninguno
    let solpeds = JSON.parse(localStorage.getItem('solpeds')) || [];

    // Crear objeto SOLPED
    const nuevaSolped = {
        codigo: codigoSolped,
        numeroMaterial: numeroMaterial,
        nombreMaterial: nombreMaterial,
        cantidad: cantidad,
        almacen: almacen,
        fechaCreacion: new Date().toISOString()  // Agregar fecha de creación
    };

    // Agregar la nueva SOLPED al array
    solpeds.push(nuevaSolped);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('solpeds', JSON.stringify(solpeds));

    return codigoSolped;  // Devolver el código de la SOLPED creada
}

function generarCodigoUnico() {
    // Función ficticia para generar un código único
    return 'SOLPED-' + Math.floor(Math.random() * 1000);
}

function mostrarMensaje(tipo, mensaje) {
    // Función ficticia para mostrar mensajes
    alert(`${tipo.toUpperCase()}: ${mensaje}`);
}

function registrarHistorial(accion, descripcion) {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    const nuevoRegistro = {
        fecha: new Date().toISOString(),
        accion: accion,
        descripcion: descripcion
    };
    historial.push(nuevoRegistro);
    localStorage.setItem('historial', JSON.stringify(historial));
}