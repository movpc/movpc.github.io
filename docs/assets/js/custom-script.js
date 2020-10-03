// closes #formModal onsubmit
$(function(){
    $('#mc-embedded-subscribe-form').submit(function(){
        $('#formModal').modal('hide')
    });

    $('#events').DataTable();

    $('#select-region').change(function() {
        $('#events').DataTable().column(0).search($('#select-region').val(), false, false).draw();
    });

    $('#input-date').change(function() {
        var dateArray = $('#input-date').val().split('-');
        var dateValue = dateArray.length === 1 ? "" : dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        $('#events').DataTable().column(3).search(dateValue, false, false).draw();
    });
});
