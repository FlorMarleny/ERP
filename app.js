// Funciones de gestión de inventario y stock
function guardarInventario(inventario) {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

function obtenerInventario() {
    return JSON.parse(localStorage.getItem('inventario')) || [];
}

function guardarStock(stock) {
    localStorage.setItem('stock', JSON.stringify(stock));
}

function obtenerStock() {
    return JSON.parse(localStorage.getItem('stock')) || {};
}

function guardarHistorial(historial) {
    localStorage.setItem('historial', JSON.stringify(historial));
}

function obtenerHistorial() {
    return JSON.parse(localStorage.getItem('historial')) || [];
}

// Función para mostrar mensajes de éxito o error
function mostrarMensaje(tipo, mensaje) {
    alert(mensaje);
}

// Función para actualizar la tabla de materiales
function actualizarTablaMateriales() {
    const tbody = document.querySelector('#materiales-table tbody');
    const inventario = obtenerInventario();
    tbody.innerHTML = '';

    inventario.forEach((material, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${material.numero}</td>
            <td>${material.nombre}</td>
            <td>${material.precio}</td>
            <td>
                <button onclick="editarMaterial(${index})">Editar</button>
                <button onclick="eliminarMaterial(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para editar un material
function editarMaterial(index) {
    window.location.href = `editarMaterial.html?index=${index}`;
}

// Función para eliminar un material
function eliminarMaterial(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este material?')) {
        const inventario = obtenerInventario();
        inventario.splice(index, 1);
        guardarInventario(inventario);
        actualizarTablaMateriales();
        mostrarMensaje('success', 'Material eliminado correctamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaMateriales();
});
