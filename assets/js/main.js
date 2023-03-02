document.addEventListener("DOMContentLoaded", () => {
	const pageContainer = document.getElementById("page");
	pageContainer.innerHTML += buildPage() + buildPage();
	const csvTextarea = document.getElementById("csvTextarea");
	const internshipprocessor = document.getElementById("internshipprocessor");

	function disableFormControls() {
		const inputs = Array.from(internshipprocessor.querySelectorAll("input, select, textarea"));
		inputs.forEach((input) => {
			input.disabled = true;
		});
	}

	function enableFormControls() {
		const inputs = Array.from(internshipprocessor.querySelectorAll("input, select, textarea"));
		inputs.forEach((input) => {
			input.disabled = false;
		});
	}

	csvTextarea.addEventListener("input", () => {
		if (csvTextarea.value.trim().length > 0) {
			disableFormControls();
			pageContainer.innerHTML = "";
			processCSV(csvTextarea.value);
		} else {
			enableFormControls();
			pageContainer.innerHTML = "";
			pageContainer.innerHTML += buildPage();
		}
	});

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
				const formattedDate = formatDate(target.value);

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

function formatDate(dateValue) {
	let date;
	if (typeof dateValue === "string") {
		const [day, month, year] = dateValue.split("/");
		date = new Date(`${year}-${month}-${day}`);
	} else {
		date = new Date(dateValue);
	}

	const formattedDate = new Intl.DateTimeFormat("fr-TN", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
	return formattedDate;
}

function printDiv(divName) {
	let filename = `ATTESTATION - ${$(".name_text").val()}${$(".lastname_text").val()}_stage${$(".typestage_text").val()}.pdf`;
	document.title = filename;
	window.print();
	document.title = "Crétateur des attestations de stage - ITQAN Labs";
}

function processCSV(csvString) {
	try {
		const expectedHeaders = ["prenom", "nom", "genre", "cin", "niveau", "etablissement", "typeStage", "titreProjet", "dateDebut", "dateFin"];
		const rows = Papa.parse(csvString, { header: true, skipEmptyLines: true }).data;

		// Check if header row is valid
		const headers = Object.keys(rows[0]);
		if (!headers.every((header, i) => header === expectedHeaders[i])) {
			throw new Error("Invalid header row");
		}

		console.log(rows.length);
		// Process each row
		rows.forEach((r) => {
			const row = Object.values(r);
			// Check if row has all required data
			// if (!row.column1 || !row.column2 || !row.column3 || !row.column4 || !row.column5 || !row.column6 || !row.column7 || !row.column8 || !row.column9 || !row.column10) {
			//   console.error(`Row ${row} has missing data`);
			//   return;
			// }
			console.log(row);

			// Call buildPage with row data as parameters
			const pageContainer = document.getElementById("page");
			console.log(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]);
			pageContainer.innerHTML += buildPage(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]);
		});
	} catch (error) {
		console.error("Error processing CSV:", error);
	}
}

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

function lowercaseString(str) {
	let upperCount = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === str[i].toUpperCase()) {
			upperCount++;
			if (upperCount > 1) {
				return str;
			}
		}
	}
	return str.toLowerCase();
}

function addPrefixDE(s) {
	let str = lowercaseString(s);
	const firstLetter = str.charAt(0).toLowerCase();
	if (["a", "e", "i", "o", "u"].includes(firstLetter)) {
		return `d'${str}`;
	} else {
		return `de ${str}`;
	}
}

function traiterCIN(num) {
	const str = num.toString();
	if (str.length === 7) {
		return `0${str}`;
	} else {
		return str;
	}
}

function buildPage(prenom = "Ahmed", nom = "Nefzaoui", genre = "M", cin = "12345678", niveau = "3ème année", etablissement = "Institut Supérieur des Etudes Technologiques de Tozeur", typeStage = "PFE", titreProjet = null, dateDebut = "01/03/2023", dateFin = "01/04/2023") {
	return `
		<div id="onePage">
            <div id="header" style="padding: 10mm;">
                <table width="100%">
                    <tbody>
                        <tr valign="top">
                            <td width="33%">
                                <p>
                                    <font face="Cambria, serif">ITQAN Labs for Web
                                        <br>
                                        Development and Internet
                                        <br>
                                        Solution Services
                                    </font>
                                </p>
                            </td>
                            <td width="33%">
                                <p style="orphans: 0; widows: 0; margin-top: 0.06in" align="center">
                                    <img src="https://itqanlabs.com/wp-content/uploads/2022/10/ITQAN-v3-Logo-Single-2-1-1024x414-1.png" name="image1.png" width="173" height="70" border="0" align="bottom">
                                </p>
                            </td>
                            <td width="33%">
                                <p dir="rtl">
                                    <font face="Tajawal Medium, serif">
                                        <span lang="hi-IN">
                                            <font face="Tajawal Medium">
                                                <font style="font-size: 12pt" size="3">شركة إتقان للبرمجة
                                                    <br>
                                                    وتطوير خدمات و حلول
                                                </font>
                                                <br>
                                                الأنترنت والواب
                                            </font>
                                        </span>
                                    </font>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="main" style="padding: 10mm;">
                <p style="line-height: 100%; margin-top: 0.17in; margin-bottom: 0.17in" align="center">
                    <font color="#404040">
                        <font face="Calibri, serif">
                            <font style="font-size: 24pt" size="6">
                                <b>ATTESTATION DE STAGE</b>
                            </font>
                        </font>
                    </font>
                </p>
                <br>
                <p style="line-height: 150%; margin-top: 0.17in; margin-bottom: 0.17in">
                    <font face="Cambria, serif">
                        <font style="font-size: 20pt" size="5">Nous</font>
                    </font>
                    <font face="Cambria, serif">
                        <font style="font-size: 14pt" size="4">, soussignés, SOCIÉTÉ ITQAN Labs, certifions par la présente que <span contentdynamic class="name_text">${prenom}</span>
                            <span contentdynamic class="lastname_text">${nom}</span>; titulaire de la CIN N° <span contentdynamic class="cin_text">${traiterCIN(cin)}</span>, <span contentdynamic id="etud">${genre === "M" ? "étudiant" : "étudiante"}</span> de <span contentdynamic class="annee_text">${niveau}</span> en <span contentdynamic class="uni_text">${etablissement}</span>, à effectuer un stage <span contentdynamic class="typestage_text">${addPrefixDE(typeStage)}</span> ${titreProjet === null || titreProjet === "null" ? "" : `intitulé “<span contentdynamic class="titreprojet_text">${titreProjet}</span>”`}
							au sein de la compagnie à Tozeur et ce du <span contentdynamic class="du_text">${formatDate(dateDebut)}</span> au <span contentdynamic class="au_text">${formatDate(dateFin)}</span>. <br>
                        </font>
                    </font>
                </p>
                <p>
                    <font face="Cambria, serif">
                        <font style="font-size: 14pt" size="4">Le stagiaire a fait preuve d'une grande motivation, d'un esprit d'initiative et de sérieux dans l'accomplissement de ses missions. <span contentdynamic id="ilelle">${genre === "M" ? "Il" : "Elle"}</span> a également su s'adapter rapidement à l'environnement de travail et faire preuve d'une bonne capacité d'analyse et de résolution de problèmes. </font>
                    </font>
                </p>
                <p>
                    <font face="Cambria, serif">
                        <font style="font-size: 14pt" size="4">Le stage a permis <span contentdynamic class="name_text">${prenom}</span> de développer ses compétences en informatique et de mettre en pratique les connaissances acquises lors de sa formation. </font>
                    </font>
                </p>
                <p>
                    <font face="Cambria, serif">
                        <font style="font-size: 14pt" size="4">En conséquence, je recommande vivement <span contentdynamic id="monsieurmadame">${genre === "M" ? "Monsieur" : "Madame/Mademoiselle"}</span>
                            <span contentdynamic class="name_text">${prenom}</span> pour toute opportunité de stage ou d'emploi dans le domaine de l'informatique.
                        </font>
                    </font>
                </p>
                <p style="line-height: 150%; margin-top: 0.17in; margin-bottom: 0.17in">
                    <font face="Cambria, serif">
                        <font style="font-size: 13pt" size="4">
                            <i>Cette attestation est délivrée à l'intéressé(e) suivant sur sa demande pour servir et valoir ce que de droit.</i>
                        </font>
                    </font>
                </p>
                <p style="line-height: 100%; margin-top: 0.17in; margin-bottom: 0.17in">
                    <font face="Cambria, serif">Tozeur le </font>
                    <font face="Cambria, serif">
                        <i>${formatDate(new Date())}</i>
                    </font>
                </p>
                <p style="line-height: 100%; margin-top: 0.17in; margin-bottom: 0.17in" align="right">
                    <font face="Cambria, serif">
                        <b>La direction <br>
                        </b>
                    </font>
                    <font face="Cambria, serif">Ahmed Nefzaoui</font>
                </p>
            </div>
            <div id="footer" style="position:absolute; bottom: 0;left:0;right:0;padding: 10mm 10mm 5mm;">
                <table>
                    <tbody>
                        <tr valign="top">
                            <td width="30%">
                                <p class="ltrcopyright">
                                    © ALL RIGHTS RESERVED to ITQAN Labs LLC - www.itqanlabs.com
                                    <br>
                                    Cyberpark Tozeur, 2200, Tunisia
                                    <br>
                                    Email: hello@itqanlabs.com
                                    <br>
                                    Phone (TN): 27 771 623
                                    <br>
                                    Phone (Intl): +1 (202) 773-9571
                                    <br>
                                    Registration ID / MF: 1599801F
                                </p>
                            </td>
                            <td width="30%">
                                <p dir="rtl" align="right" class="rtlcopyright">
                                    © جميع الحقوق محفوظة لشركة إتقان محدودة المسؤولية
                                    <br>
                                    الموقع الإلكتروني : www.itqanlabs.com
                                    <br>
                                    العنوان : مركز العمل عن بعد، 2200 توزر، الجمهورية التونسية
                                    <br>
                                    البريد الإلكتروني : hello@itqanlabs.com
                                    <br>
                                    الهاتف ( تونس ): 27771623
                                    <br>
                                    الهاتف ( دولي ): 0012027739571
                                    <br>
                                    رقم تسجيل الشركة / الترقيم الضريبي : 1599801F
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	`;
}
