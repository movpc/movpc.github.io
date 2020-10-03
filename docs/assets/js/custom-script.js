// closes #formModal onsubmit
$(function(){
    $('#mc-embedded-subscribe-form').submit(function(){
        $('#formModal').modal('hide')
    });

    $('#events').DataTable();

    $('#select-region').change(function() {
        $('#events').DataTable().column(0).search(
            $('#select-region').val(),
            false, //$('#col'+i+'_regex').prop('checked'),
            false //$('#col'+i+'_smart').prop('checked')
        ).draw();
    });
});
