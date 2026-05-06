document.addEventListener('DOMContentLoaded', function() {

    var btnMenu = document.getElementById('btnMenu');
    var menuNav = document.getElementById('menuNav');

    btnMenu.addEventListener('click', function() {
        /* classList.toggle añade la clase "activo" si no la tiene, o la quita si ya la tiene */
        menuNav.classList.toggle('activo');

        if (menuNav.classList.contains('activo')) {
            btnMenu.textContent = 'Menu ▲';
        } else {
            btnMenu.textContent = 'Menu ▼';
        }
    });

    var enlaces = document.querySelectorAll('#menuNav a');
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            menuNav.classList.remove('activo');
            btnMenu.textContent = 'Menu ▼';
        });
    });

    var campoEmail = document.getElementById('email');

    campoEmail.addEventListener('blur', function() {
        /* Expresión regular: comprueba que el email tenga @ y dominio (.com, .es...) */
        var formatoEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        if (!formatoEmail.test(campoEmail.value) && campoEmail.value !== '') {
            campoEmail.style.border = '2px solid red';
        } else {
            campoEmail.style.border = '2px solid green';
        }
    });

    var formCalculadora = document.getElementById('formCalculadora');

    formCalculadora.addEventListener('submit', function(evento) {

        /* evento.preventDefault() evita que la página se recargue al pulsar Calcular */
        evento.preventDefault();

        var precioTexto    = document.getElementById('juego').value;
        var plataforma     = document.getElementById('plataforma').value;
        var cantidadTexto  = document.getElementById('cantidad').value;
        var descuentoTexto = document.getElementById('descuento').value;

        if (precioTexto === '' || plataforma === '' || cantidadTexto === '') {
            document.getElementById('resultado').innerHTML = '<p style="color:red;">Por favor rellena todos los campos.</p>';
            return;
        }

        /* parseFloat y parseInt convierten el texto del input en número para poder operar */
        /* Sin esto "5" + "5" daría "55" en vez de 10 */
        var precioUnitario = parseFloat(precioTexto);
        var cantidad       = parseInt(cantidadTexto);
        var descuento      = parseInt(descuentoTexto);

        /* Cálculos: base, descuento, IVA y total */
        var precioBase         = precioUnitario * cantidad;
        var importeDescuento   = precioBase * (descuento / 100);
        var precioConDescuento = precioBase - importeDescuento;
        var importeIVA         = precioConDescuento * 0.21;
        var totalFinal         = precioConDescuento + importeIVA;

        var selectJuego = document.getElementById('juego');
        var nombreJuego = selectJuego.options[selectJuego.selectedIndex].text;

        /* toFixed(2) formatea el número para que siempre tenga 2 decimales */
        var texto = '';
        texto += '<strong>Juego:</strong> '           + nombreJuego + '<br>';
        texto += '<strong>Plataforma:</strong> '      + plataforma + '<br>';
        texto += '<strong>Cantidad:</strong> '        + cantidad + ' ud.<br>';
        texto += '<strong>Precio unitario:</strong> ' + precioUnitario.toFixed(2) + ' €<br>';
        texto += '<strong>Precio base:</strong> '     + precioBase.toFixed(2) + ' €<br>';

        if (descuento > 0) {
            texto += '<strong>Descuento (' + descuento + '%):</strong> -' + importeDescuento.toFixed(2) + ' €<br>';
        }

        texto += '<strong>IVA (21%):</strong> ' + importeIVA.toFixed(2) + ' €<br>';
        texto += '<hr>';
        texto += '<strong style="font-size:1.2rem;">TOTAL: ' + totalFinal.toFixed(2) + ' €</strong>';

        /* innerHTML escribe el resultado dentro del div resultado */
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

        /* setTimeout espera 3 segundos y luego limpia el formulario */
        setTimeout(function() {
            formContacto.reset();
            document.getElementById('confirmacion').innerHTML = '';
            campoEmail.style.border = '';
        }, 3000);
    });

});