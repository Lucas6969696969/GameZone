document.addEventListener('DOMContentLoaded', function() {

    /* var: forma antigua de declarar variables (hoy se recomienda let o const) */
    var btnMenu = document.getElementById('btnMenu');
    var menuNav = document.getElementById('menuNav');

    btnMenu.addEventListener('click', function() {
        /* toggle: añade o quita la clase "activo" según si existe o no */
        menuNav.classList.toggle('activo');
        if (menuNav.classList.contains('activo')) {
            btnMenu.textContent = 'Menu ▲';
        } else {
            btnMenu.textContent = 'Menu ▼';
        }
    });

    /* querySelectorAll: selecciona todos los enlaces del menú */
    var enlaces = document.querySelectorAll('#menuNav a');

    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            menuNav.classList.remove('activo');
            btnMenu.textContent = 'Menu ▼';
        });
    });

    var campoEmail = document.getElementById('email');

    /* blur: evento que se activa cuando el campo pierde el foco (sales del input) */
    campoEmail.addEventListener('blur', function() {

        /* Expresión regular: valida formato de email */
        var formatoEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        /* test(): comprueba si el valor cumple la expresión regular */
        if (!formatoEmail.test(campoEmail.value) && campoEmail.value !== '') {
            campoEmail.style.border = '2px solid red';
        } else {
            campoEmail.style.border = '2px solid green';
        }
    });

    var formCalculadora = document.getElementById('formCalculadora');

    formCalculadora.addEventListener('submit', function(evento) {

        evento.preventDefault();

        var precioTexto    = document.getElementById('juego').value;
        var plataforma     = document.getElementById('plataforma').value;
        var cantidadTexto  = document.getElementById('cantidad').value;
        var descuentoTexto = document.getElementById('descuento').value;

        if (precioTexto === '' || plataforma === '' || cantidadTexto === '') {
            document.getElementById('resultado').innerHTML = '<p style="color:red;">Por favor rellena todos los campos.</p>';
            return;
        }

        /* parseFloat / parseInt: convierten texto en número para poder hacer cálculos */
        var precioUnitario = parseFloat(precioTexto);
        var cantidad       = parseInt(cantidadTexto);
        var descuento      = parseInt(descuentoTexto);

        var precioBase         = precioUnitario * cantidad;
        var importeDescuento   = precioBase * (descuento / 100);
        var precioConDescuento = precioBase - importeDescuento;
        var importeIVA         = precioConDescuento * 0.21;
        var totalFinal         = precioConDescuento + importeIVA;

        var selectJuego = document.getElementById('juego');
        var nombreJuego = selectJuego.options[selectJuego.selectedIndex].text;

        var texto = '';
        texto += '<strong>Juego:</strong> '           + nombreJuego + '<br>';
        texto += '<strong>Plataforma:</strong> '      + plataforma + '<br>';
        texto += '<strong>Cantidad:</strong> '        + cantidad + ' ud.<br>';

        /* toFixed(2): deja el número con 2 decimales */
        texto += '<strong>Precio unitario:</strong> ' + precioUnitario.toFixed(2) + ' €<br>';
        texto += '<strong>Precio base:</strong> '     + precioBase.toFixed(2) + ' €<br>';

        if (descuento > 0) {
            texto += '<strong>Descuento (' + descuento + '%):</strong> -' + importeDescuento.toFixed(2) + ' €<br>';
        }

        texto += '<strong>IVA (21%):</strong> ' + importeIVA.toFixed(2) + ' €<br>';
        texto += '<hr>';
        texto += '<strong style="font-size:1.2rem;">TOTAL: ' + totalFinal.toFixed(2) + ' €</strong>';

        /* innerHTML: escribe el resultado dentro del HTML */
        document.getElementById('resultado').innerHTML = texto;
    });

    var btnLimpiar = document.getElementById('btnLimpiar');

    btnLimpiar.addEventListener('click', function() {
        document.getElementById('resultado').innerHTML = '';
    });

    var formContacto = document.getElementById('formContacto');

    formContacto.addEventListener('submit', function(evento) {

        evento.preventDefault();

        var nombre = document.getElementById('nombre').value;
        var email  = document.getElementById('email').value;
        var asunto = document.getElementById('asunto').value;

        if (asunto === '') {
            document.getElementById('confirmacion').innerHTML = 'Por favor selecciona un asunto.';
            document.getElementById('confirmacion').style.color = 'red';
            return;
        }

        var formatoEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        if (!formatoEmail.test(email)) {
            document.getElementById('confirmacion').innerHTML = 'El email no tiene un formato valido.';
            document.getElementById('confirmacion').style.color = 'red';
            return;
        }

        document.getElementById('confirmacion').innerHTML = 'Gracias ' + nombre + ', mensaje enviado a ' + email;
        document.getElementById('confirmacion').style.color = 'green';

        /* setTimeout: ejecuta una función después de un tiempo (3000ms = 3s) */
        setTimeout(function() {
            formContacto.reset();
            document.getElementById('confirmacion').innerHTML = '';
            campoEmail.style.border = '';
        }, 3000);
    });

});
