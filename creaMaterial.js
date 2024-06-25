document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crear-material-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const numero = document.getElementById('numero-material').value;
        const nombre = document.getElementById('nombre-material').value;
        const unidad = document.getElementById('unidad-medida').value;
        const almacen = document.getElementById('almacen-material').value;
        const cantidad = 0;
        const precio = parseFloat(document.getElementById('precio-material').value);


        const nuevoMaterial = { numero, nombre, unidad, almacen, precio,cantidad };

        let inventario = obtenerInventario();
        inventario.push(nuevoMaterial);
        guardarInventario(inventario);

        mostrarMensaje('success', 'Material creado correctamente');
        window.location.href = 'index.html';

        // Registrar la acción en el historial
        registrarHistorial(`Creación de material`,`Creación de material: ${numero}-${nombre}`);
    });
});

function registrarHistorial(accion, descripcion) {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push({
        accion,
        descripcion,
        fecha: new Date().toISOString()
    });
    localStorage.setItem('historial', JSON.stringify(historial));
}