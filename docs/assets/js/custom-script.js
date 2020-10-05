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
            { "data": "region", "orderData": [ 1, 4 ]}, // sorts by region then date
            { "data": "organization" },
            { "data": "location" },
            { "data": {
                _: 'date.display',
                sort: 'date.sort'}
            },
            { "data": "time" }
        ],
        "order": [[1, 'asc']] // default to be sorted by region column
    });

    $('#input-region').change(function() {
        $('#events').DataTable().column(1).search($('#input-region').val(), false, false).draw();
    });

    $('#input-date').change(function() {
        // input type=date values are stored as yyyy-mm-dd, we need to search by mm/dd/yyyy
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

    // look for query params and then filter table if found
    // TODO: make the data param work, as of now it does NOT
    var parameters = location.search.replace("?", "").split("&");
    parameters.forEach( function(parameter) {
        if ( parameter && (parameter.indexOf("region") > -1 || parameter.indexOf("date") > -1) ) {
            var nameValueArray = parameter.split("=");
            var name = nameValueArray[0];
            var value = nameValueArray[1];
            console.log(name, value);
            var input = $('#input-'+name);
            input.val(decodeURI(value));
            input.trigger("change");
        }
    });
});