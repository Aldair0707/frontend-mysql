//var url = "http://localhost:3300/api/users";
var url = "https://mysql-api-2cl5.onrender.com/api/users";

function postUser() {

    var user = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (data) {
            limpiarInputsUser();
            $('#btn-update-user').hide();
            $('#resultado-user').html(`<div class="mensaje-exito">✅ Usuario creado correctamente</div>`);
        },
        error: function (err) {
            alert('Error al crear usuario');
            console.error(err);
        }
    });
}

function editarUser(id) {
    $.getJSON(url + '/' + id, function (data) {
        const user = data.Usuario;

        if (user) {
            $('#name').val(user.name);
            $('#email').val(user.email);
            $('#age').val(user.age);
            $('#comments').val(user.comments);

            $('#btn-update-user').show().data('id', id);
            $('#resultado-user').html("");
        } else {
            alert('Usuario no encontrado.');
        }
    });
}

function updateUser() {
    const id = $('#btn-update-user').data('id');

    var user = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    $.ajax({
        url: url + '/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (data) {
            alert('Usuario actualizado');
            $('#btn-update-user').hide();
            limpiarInputsUser();
            getUsers();
        },
        error: function (err) {
            alert('Error al actualizar usuario');
            console.error(err);
        }
    });
}

function getUserById() {
    const id = $('#id-user').val();

    $.getJSON(url + '/' + id, function (data) {
        const user = data.Usuario;

        if (user) {
            var html = '<table border="1">' +
                '<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Comentarios</th><th>Acciones</th></tr>' +
                '<tr>' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.name + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.age + '</td>' +
                '<td>' + user.comments + '</td>' +
                '<td>' +
                '<button class="btn-edit-user" onclick="editarUser(' + user.id + ')">Editar</button> ' +
                '<button class="btn-delete-user" onclick="deleteUser(' + user.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>' +
                '</table>';
            $('#resultado-user').html(html);
        } else {
            alert('Usuario no encontrado.');
        }
    });
}


function getUsers() {
    $.getJSON(url, function (json) {
        var arrUsers = json.users;
        var html = '<table border="1">' +
            '<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Comentarios</th><th>Acciones</th></tr>';

        arrUsers.forEach(function (item) {
            html += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.comments + '</td>' +
                '<td>' +
                '<button class="btn-edit-user" onclick="editarUser(' + item.id + ')">Editar</button> ' +
                '<button class="btn-delete-user" onclick="deleteUser(' + item.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
        });

        html += '</table>';
        $('#resultado-user').html(html);
    });
}

function deleteUser(id) {
    if (!confirm("¿Estás seguro de eliminar al usuario con ID " + id + "?")) return;

    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function (data) {
            alert('Usuario eliminado: ' + JSON.stringify(data));
            getUsers();
        },
        error: function (err) {
            alert('Error al eliminar usuario');
            console.error(err);
        }
    });
}

function limpiarInputsUser() {
    $('#name').val('');
    $('#email').val('');
    $('#age').val('');
    $('#comments').val('');
    $('#id-user').val('');
}

