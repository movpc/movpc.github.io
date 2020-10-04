$(function(){
    $('#mc-embedded-subscribe-form').submit(function(){
        $('#formModal').modal('hide')
    });

    var eventsTable = $('#events').DataTable({
        "ajax": "/assets/events.json",  // NOTE, jekyll adds a param to this request to break caching
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "region", "orderData": [ 1, 4 ]},
            { "data": "organization" },
            { "data": "location" },
            { "data": "date" },
            { "data": "time" }
        ],
        "order": [[1, 'asc']]
    });

    $('#select-region').change(function() {
        $('#events').DataTable().column(1).search($('#select-region').val(), false, false).draw();
    });

    $('#input-date').change(function() {
        var dateArray = $('#input-date').val().split('-');
        var dateValue = dateArray.length === 1 ? "" : dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        $('#events').DataTable().column(4).search(dateValue, false, false).draw();
    });

    $('#events tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = eventsTable.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( displayDetails(row.data())).show();
            tr.addClass('shown');
        }
    } );

    function displayDetails(event) {
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
                '<td>Contact Information:</td>'+
                '<td>'+event.contactInformation+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Details:</td>'+
                '<td>'+event.details+'</td>'+
            '</tr>'+
        '</table>';
    }
});