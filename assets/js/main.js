document.addEventListener("DOMContentLoaded", () => {
	const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');
	inputs.forEach((input) => {
		if (input.nodeName === "SELECT") {
			var s = $(input).select2();
			$(input).on("select2:select", updateSpans);
		}
		input.addEventListener("input", updateSpans);
		input.addEventListener("change", updateSpans);
	});
	$("input[type=radio][name=gender]").change(function () {
		if (this.value === "male") {
			$("#monsieurmadame").text("Monsieur");
			$("#ilelle").text("Il");
			$("#etud").text("étudiant");
		} else if (this.value === "female") {
			$("#monsieurmadame").text("Madame/Mademoiselle");
			$("#ilelle").text("Elle");
			$("#etud").text("étudiante");
		}
	});

	function updateSpans(event) {
		const target = event.target;
		const textSpans = document.querySelectorAll(`.${target.id}_text`);
		if (target.type === "date" && target.value) {
			try {
				const date = new Date(target.value);
				const formattedDate = new Intl.DateTimeFormat("fr-TN", {
					month: "long",
					day: "numeric",
					year: "numeric",
				}).format(date);
				textSpans.forEach((span) => {
					span.textContent = formattedDate;
				});
			} catch (e) {
				console.error(`Error formatting date: ${e.message}`);
			}
		} else {
			textSpans.forEach((span) => {
				span.textContent = event.params ? event.params.data.text : $(target).val();
			});
		}
	}
});

function printDiv(divName) {
	const printContents = document.getElementById(divName).innerHTML;
	const originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
    let filename = `ATTESTATION - ${$(".name_text").val()}${$(".lastname_text").val()}_stage${$(".typestage_text").val()}.pdf`;
    document.title = filename;
	window.print();
    document.title = "Crétateur des attestations de stage - ITQAN Labs";
	document.body.innerHTML = originalContents;
}

function processCSV() {}

function exportToPdf(mydiv) {
	var doc = new jsPDF();
	var elementHandler = {
		"#ignorePDF": function (element, renderer) {
			return true;
		},
	};
	var source = window.document.getElementById(mydiv);
	doc.fromHTML(source, 15, 15, {
		width: 180,
		elementHandlers: elementHandler,
	});
	let filename = `${$(".name_text").val()}${$(".lastname_text").val()}_stage${$(".typestage_text").val()}.pdf`;
	let finalizedFilename = filename.replace(" ", "");
	doc.save(finalizedFilename);
}

// added function to only show specific div when printing
function handlePrint() {
	const divToPrint = document.getElementById("#page");
	divToPrint.classList.remove("d-none");
	window.print();
	divToPrint.classList.add("d-none");
}
