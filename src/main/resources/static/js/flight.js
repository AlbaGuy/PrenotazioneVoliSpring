ChangeElementColor($("[name=dates]"), "id");
ChangeElementColor($("input[type=radio][name=your-extra-options]"), "value");

$('#btnPrint').click(
		function() {
			var mywindow = window.open('', 'Prenotazione',
					'height=800,width=900');
			var response = $("#form_outputResponse").html();
			mywindow.document.write('<html><head><title>' + "Prenotazione" + '</title>');
			mywindow.document.write('</head><body >');
			mywindow.document.write(response);
			mywindow.document.write('</body></html>');
			mywindow.print();
			mywindow.close();
		});

$('#frm-submit')
		.click(
				function() {
					if ($('select option:selected').text() != "0") {

						var counter = 0;
						$("form").each(function() {
							if ($(this).css('display') == 'block') {
								var inputs = $(this).find(':input');
								inputs.each(function() {
									if ($(this).val().length === 0) {
										counter++;
									}
								});
							}
						});

						if (counter == 0) {
							AjaxBooking();
						} else {
							$("#form_output").html("Dati passeggeri mancanti!");
							$("#form_output")
									.addClass(
											"col-md-10 offset-1 alert alert-danger text-md-center");
						}

					} else {
						$("#form_output").html(
								"Nessun Volo e/o Passeggero selezionato!");
						$("#form_output")
								.addClass(
										"col-md-10 offset-1 alert alert-danger text-md-center");
					}
				});

$("#flightText").on('keyup change', function(e) {
	SearchFlightAjax();
});

$('#myselect').change(function() {
	var id = $('#myselect option:selected').attr('id');

	$('.myform').hide();
	for (i = 1; i <= 10; i++) {
		var formid = "#form" + i;
		if (i <= id) {
			$(formid).show();
		} else {
			$(formid).trigger("reset");
		}

	}
});

$("input[type=radio]").change(function() {
	var idVolo = $(this).attr("id");
	$("input[name='flightId']").val(idVolo);
});

function ChangeElementColor(iterator, attribute) {
	iterator.each(function() {
		var data = $(this).attr(attribute);
		var indexData = data.indexOf(".0");
		data = data.substring(0, indexData);
		data = new Date(data);
		data.setHours(data.getHours() - 2);
		var today = new Date();
		if (attribute == "value") {
			var seats = $(this).attr("class");
			if (data <= today || seats <= 0) {
				$(this).attr("disabled", true);
				$(this).parent().find('span').css('background-color',
						'#e3342f99');
			}
		} else if (attribute == "id") {
			if (data <= today) {
				$(this).css('color', 'red');
			}
		}

	});
}

function AjaxBooking() {
	$.ajax({
		url : "booking",
		type : "POST",
		data : $("form").serializeArray(),
		success : function(data) {
			$("#forms").hide();
			$("#form_output").html("Prenotazione effettuata con successo");
			$("#form_outputResponse").html(data);
			$("#form_output").removeClass("alert alert-danger");
			$("#form_output").addClass(
					"col-md-10 offset-1 alert alert-success text-md-center");
			$("#form_buttons").hide();
			$("#btnPrint").show();

		},
		error : function(jXHR, textStatus, errorThrown) {
			$("#form_output").html("Biglietti non disponibili!");
			$("#form_output").addClass(
					"col-md-10 offset-1 alert alert-danger text-md-center");
		}
	});
}

function SearchFlightAjax() {
	var data = {
		destination : $("#flightText").val()
	}
	// DO POST
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : "searchFlight",
		data : JSON.stringify(data),
		dataType : 'text',
		success : function(data) {
			$("#tableFlight").html(data);
			console.log('success done');
		},
		error : function(data) {
			console.log('ERROR : ' + data);
		},
		complete : function(data) {
			console.log('complete done');
		}
	});
}
