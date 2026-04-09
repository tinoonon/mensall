// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function showInPopup(url, title, size = 'xl') {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $('#form-modal .modal-body').html(res);
            $('#form-modal .modal-title').html(title);

            // Ajuste do tamanho do modal
            var modalDialog = $('#form-modal .modal-dialog');
            modalDialog.removeClass('modal-sm modal-md modal-lg modal-xl'); // Remove qualquer classe de tamanho anterior
            modalDialog.addClass('modal-' + size); // Adiciona a classe de tamanho especificada

            $('#form-modal').modal('show');
            //console.log(title);
            //console.log(url);
        },
        error: function (res) {
            console.log(res);
        }
    });
}

showInPopupFixed = (url, title) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $('#form-modal .modal-body').html(res);
            $('#form-modal .modal-title').html(title);
            $('#form-modal').modal({
                backdrop: 'static',
                keyboard: false
            });
            $('#sidenav-main').addClass('disable-sidenav');
            $('#form-modal').modal('show');
            console.log(title);
            console.log(url);
        },
        error: function (res) {
            console.log(res);
        }
    })
}

sendForm = form => {
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(res, 'text/html');
                var hiddenInput = htmlDoc.querySelector('#SucessResult');
                if (hiddenInput) {
                    if (hiddenInput.checked) {
                        $('#view-all').html('')
                        $('#form-modal .modal-body').html('');
                        $('#form-modal .modal-title').html('');
                        //$('#form-modal').modal('hide');
                        $('#modal').html('');
                        $('#sidenav-main').removeClass('disable-sidenav');
                        window.location.reload();
                    } else {
                        $('#form-modal .modal-body').html(res);
                    }
                } 
                
            },
            error: function (err) {
                console.log(err)
            }
        })
        return false;
    } catch (ex) {
        console.log(ex)
    }
}
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}