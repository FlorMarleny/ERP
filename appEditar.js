document.addEventListener('DOMContentLoaded', function() {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index'));

    if (!Number.isNaN(index) && index >= 0 && index < inventario.length) {
        const material = inventario[index];
        document.getElementById('edit-material-index').value = index;
        document.getElementById('edit-material-numero').value = material.numero;
        document.getElementById('edit-material-nombre').value = material.nombre;
        document.getElementById('edit-material-cantidad').value = material.cantidad;
        document.getElementById('edit-material-unidad').value = material.unidad;
        document.getElementById('edit-material-almacen').value = material.almacen;
        document.getElementById('edit-material-precio').value = material.precio;
    }

    document.getElementById('form-editar-material').addEventListener('submit', function(event) {
        event.preventDefault();
        const index = parseInt(document.getElementById('edit-material-index').value);
        const numero = document.getElementById('edit-material-numero').value;
        const nombre = document.getElementById('edit-material-nombre').value;
        const cantidad = parseInt(document.getElementById('edit-material-cantidad').value);
        const unidad = document.getElementById('edit-material-unidad').value;
        const almacen = document.getElementById('edit-material-almacen').value;
        const precio = parseFloat(document.getElementById('edit-material-precio').value);

        if (!Number.isNaN(index) && index >= 0 && index < inventario.length) {
            inventario[index] = { numero, nombre, cantidad, unidad, almacen, precio };
            localStorage.setItem('inventario', JSON.stringify(inventario));
            alert('Material editado correctamente');
            window.location.href = 'index.html'; // Redirigir de vuelta al listado de materiales
        } else {
            alert('Error al editar el material.');
        }
    });
});
