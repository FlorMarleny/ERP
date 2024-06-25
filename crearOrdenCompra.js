document.addEventListener('DOMContentLoaded', function() {
    const crearOrdenCompraForm = document.getElementById('crear-orden-compra-form');

    crearOrdenCompraForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const codigoSolped = document.getElementById('codigo-solped').value.trim();
        const fechaCompra = document.getElementById('fecha-compra').value.trim();

        if (codigoSolped === '' || fechaCompra === '') {
            mostrarMensaje('error', 'Por favor completa todos los campos.');
            return;
        }

        const solpedEncontrada = buscarSolped(codigoSolped);

        if (!solpedEncontrada) {
            mostrarMensaje('error', 'La SOLPED no existe. Verifica el código ingresado.');
            return;
        }

        const codigoOrdenCompra = crearOrdenCompra(codigoSolped, fechaCompra);

        if (codigoOrdenCompra) {
            mostrarMensaje('success', `Orden de Compra creada correctamente con código: ${codigoOrdenCompra}`);
            crearOrdenCompraForm.reset();
            registrarHistorial('Creación de Orden de Compra', `Orden de Compra creada: ${codigoOrdenCompra}`); // Registro en el historial
            actualizarStockDesdeSolped(codigoSolped); // Actualizar el stock después de crear la Orden de Compra
        } else {
            mostrarMensaje('error', 'Error al crear la Orden de Compra. Inténtalo de nuevo.');
        }
    });
});

function buscarSolped(codigoSolped) {
    const solpeds = JSON.parse(localStorage.getItem('solpeds')) || [];
    return solpeds.find(solped => solped.codigo === codigoSolped);
}

function crearOrdenCompra(codigoSolped, fechaCompra) {
    const codigoOrdenCompra = generarCodigoUnico();
    let ordenesCompra = JSON.parse(localStorage.getItem('ordenesCompra')) || [];

    const nuevaOrdenCompra = {
        codigo: codigoOrdenCompra,
        codigoSolped: codigoSolped,
        fechaCompra: fechaCompra,
        estado: 'Pendiente',
        fechaCreacion: new Date().toISOString()
    };

    ordenesCompra.push(nuevaOrdenCompra);
    localStorage.setItem('ordenesCompra', JSON.stringify(ordenesCompra));

    return codigoOrdenCompra;
}

function actualizarStockDesdeSolped(codigoSolped) {
    const solpeds = JSON.parse(localStorage.getItem('solpeds')) || [];
    const solpedEncontrada = solpeds.find(solped => solped.codigo === codigoSolped);

    if (!solpedEncontrada) {
        mostrarMensaje('error', 'La SOLPED asociada no fue encontrada para actualizar el stock.');
        return;
    }

    const inventario = obtenerInventario();
    const materialExistente = inventario.find(material => material.numero === solpedEncontrada.numeroMaterial);

    if (materialExistente) {
        materialExistente.cantidad += solpedEncontrada.cantidad;
    } else {
        inventario.push({
            numero: solpedEncontrada.numeroMaterial,
            nombre: solpedEncontrada.nombreMaterial,
            cantidad: solpedEncontrada.cantidad,
            unidad: 'unidad', 
            precio: 0 
        });
    }

    guardarInventario(inventario);
    actualizarTablaStock();
}

function generarCodigoUnico() {
    return 'OC' + new Date().getTime();
}

function mostrarMensaje(tipo, mensaje) {
    alert(`${tipo.toUpperCase()}: ${mensaje}`);
}

function actualizarTablaStock() {
    const tablaStock = document.querySelector('#tabla-stock tbody');
    const inventario = obtenerInventario();
    tablaStock.innerHTML = '';

    inventario.forEach(material => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${material.numero}</td>
            <td>${material.nombre}</td>
            <td>${material.cantidad}</td>
            <td>${material.unidad}</td>
            <td>${material.precio}</td>
        `;
        tablaStock.appendChild(row);
    });
}

function obtenerInventario() {
    return JSON.parse(localStorage.getItem('inventario')) || [];
}

function guardarInventario(inventario) {
    localStorage.setItem('inventario', JSON.stringify(inventario));
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