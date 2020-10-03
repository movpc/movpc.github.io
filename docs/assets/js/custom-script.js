// closes #formModal onsubmit
$(function(){
    $('#mc-embedded-subscribe-form').submit(function(){
        $('#formModal').modal('hide')
    });

    $('#events').DataTable();
});
