// index.html js

$(document).ready(function () {
    $('#patient-table').DataTable();
});

// Handling the back button of browser
function backbutton(url) {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            home(url)
        });
    }
}


function home(url){
    $.ajax({
        url: url,
        type: 'GET',
        success: function (res) {
            $('body').html(res)
        },
        error: function (error) {
            console.log(error)
        }
    })
}


$('#add-patient').click(function () {
    event.preventDefault()
    $.ajax({
        url: addUrl,
        type: 'GET',
        success: function (res) {
            $('body').html(res)
            window.history.pushState("", "Patients records", addUrl);
        },
        error: function (error) {
            console.log(error)
        }
    })
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Element(url, method) {
    if (method == 'DELETE') {
        var answer = window.confirm("Are you sure to delete record?");
        if (answer) {
            event.preventDefault()
            $.ajax({
                url: url,
                type: method,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
                success: function (res) {
                    window.history.pushState("", "Patients records", url);
                    $('body').html(res)
                },
                error: function (error) {
                    console.log(error)
                }

            });
        }
    } else {
        event.preventDefault()
        $.ajax({
            url: url,
            type: method,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function (res) {
                window.history.pushState("", "Patients records", url);
                $('body').html(res)
            },
            error: function (error) {
                console.log(error)
            }

        });
    }
}

// show.html js

$('#edit-profile').click(function () {
    $('.text-value').hide();
    $('input').attr('hidden', false);
    $('select').attr('hidden', false);
    $('button').attr('hidden', false);
});

$('#cancel-save').click(function () {
    event.preventDefault()
    $('input').attr('hidden', true);
    $('select').attr('hidden', true);
    $('button').attr('hidden', true);
    $('.text-value').show();
});

$('#edit-form').submit(function () {
    event.preventDefault()
    var id = $('#edit-profile').data('id');
    var formData = $(this).serialize();
    formData += '&id=' + id
    $.ajax({
        url: editUrl,
        type: 'POST',
        data: formData,
        success: function (response) {
            $('body').html(response)
            window.history.pushState("", "Patients records", viewurl);
        },
        error: function (error) {
            console.log(error)
        }
    })
})

// create.html js


$('#patient-form').submit(function () {
    event.preventDefault()
    var fullName = $('#firstname').val() + ' ' + $('#lastname').val()
    var formData = $(this).serialize();
    formData += '&name=' + encodeURIComponent(fullName)
    $.ajax({
        url: addPatientURL,
        type: 'POST',
        data: formData,
        success: function (response) {
            $('body').html(response)
            window.history.pushState("", "Patients records", homeUrl);

        },
        error: function (error) {
            console.log(error)
        }
    })
})
