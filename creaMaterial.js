document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crear-material-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const numero = document.getElementById('numero-material').value;
        const nombre = document.getElementById('nombre-material').value;
        const unidad = document.getElementById('unidad-medida').value;
        const almacen = document.getElementById('almacen-material').value;
        const precio = parseFloat(document.getElementById('precio-material').value);

        const nuevoMaterial = { numero, nombre, unidad, almacen, precio };

        let inventario = obtenerInventario();
        inventario.push(nuevoMaterial);
        guardarInventario(inventario);

        mostrarMensaje('success', 'Material creado correctamente');
        window.location.href = 'index.html';

        // Registrar la acción en el historial
        registrarHistorial(`Creación de material: ${numero}`);
    });
});
