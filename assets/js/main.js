// Constants
const DEFAULT_VALUES = {
	prenom: "Ahmed",
	nom: "Nefzaoui",
	genre: "M",
	cin: "12345678",
	niveau: "3ème année",
	etablissement: "Institut Supérieur des Etudes Technologiques de Tozeur",
	typeStage: "PFE",
	titreProjet: null,
	dateDebut: "01/03/2023",
	dateFin: "01/04/2023"
};

// Helper Functions
const formatUtils = {
	lowercaseString: (str) => {
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
	},

	addPrefixDE: (s) => {
		let str = formatUtils.lowercaseString(s);
		const firstLetter = str.charAt(0).toLowerCase();
		if (["a", "e", "i", "o", "u"].includes(firstLetter)) {
			return `d'${str}`;
		} else {
			return `de ${str}`;
		}
	},

	traiterCIN: (num) => {
		const str = num.toString();
		return str.length === 7 ? `0${str}` : str;
	},

	formatDate: (dateValue) => {
		// Handle empty or null dates
		if (!dateValue) {
			return "";
		}

		let date;
		if (typeof dateValue === "string") {
			// Handle string date format
			if (dateValue.includes('/')) {
				const [day, month, year] = dateValue.split("/");
				date = new Date(`${year}-${month}-${day}`);
			} else {
				// Handle ISO format (from HTML date inputs)
				date = new Date(dateValue);
			}
		} else {
			date = new Date(dateValue);
		}

		// Check if date is valid before formatting
		if (isNaN(date.getTime())) {
			return "";
		}

		return new Intl.DateTimeFormat("fr-TN", {
			month: "long",
			day: "numeric",
			year: "numeric",
		}).format(date);
	}
};

// Certificate Generator
const certificateGenerator = {
	buildPage: (internData = {}) => {
		// Merge default values with provided data
		const data = { ...DEFAULT_VALUES, ...internData };

		// Prepare display text based on gender
		const genderText = {
			etudiant: data.genre === "M" ? "étudiant" : "étudiante",
			ilelle: data.genre === "M" ? "Il" : "Elle",
			monsieurmadame: data.genre === "M" ? "Monsieur" : "Madame/Mademoiselle"
		};

		// Format project title display if available
		const projetDisplay = data.titreProjet && data.titreProjet !== "null"
			? `intitulé "<span contentdynamic class="titreprojet_text">${data.titreProjet}</span>"`
			: "";

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
				<font style="font-size: 14pt" size="4">, soussignés, SOCIÉTÉ ITQAN Labs, certifions par la présente que 
				  <span contentdynamic class="name_text">${data.prenom}</span>
				  <span contentdynamic class="lastname_text">${data.nom}</span>; titulaire de la CIN N° 
				  <span contentdynamic class="cin_text">${formatUtils.traiterCIN(data.cin)}</span>, 
				  <span contentdynamic id="etud">${genderText.etudiant}</span> de 
				  <span contentdynamic class="annee_text">${data.niveau}</span> en 
				  <span contentdynamic class="uni_text">${data.etablissement}</span>, à effectuer un stage 
				  <span contentdynamic class="typestage_text">${formatUtils.addPrefixDE(data.typeStage)}</span> ${projetDisplay}
				  au sein de la compagnie à Tozeur et ce du 
				  <span contentdynamic class="du_text">${formatUtils.formatDate(data.dateDebut)}</span> au 
				  <span contentdynamic class="au_text">${formatUtils.formatDate(data.dateFin)}</span>. <br>
				</font>
			  </font>
			</p>
			<p>
			  <font face="Cambria, serif">
				<font style="font-size: 14pt" size="4">Le stagiaire a fait preuve d'une grande motivation, d'un esprit d'initiative et de sérieux dans l'accomplissement de ses missions. 
				  <span contentdynamic id="ilelle">${genderText.ilelle}</span> a également su s'adapter rapidement à l'environnement de travail et faire preuve d'une bonne capacité d'analyse et de résolution de problèmes.
				</font>
			  </font>
			</p>
			<p>
			  <font face="Cambria, serif">
				<font style="font-size: 14pt" size="4">Le stage a permis 
				  <span contentdynamic class="name_text">${data.prenom}</span> de développer ses compétences en informatique et de mettre en pratique les connaissances acquises lors de sa formation.
				</font>
			  </font>
			</p>
			<p>
			  <font face="Cambria, serif">
				<font style="font-size: 14pt" size="4">En conséquence, je recommande vivement 
				  <span contentdynamic id="monsieurmadame">${genderText.monsieurmadame}</span>
				  <span contentdynamic class="name_text">${data.prenom}</span> pour toute opportunité de stage ou d'emploi dans le domaine de l'informatique.
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
				<i>${formatUtils.formatDate(new Date())}</i>
			  </font>
			</p>
			<p style="line-height: 100%; margin-top: 0.17in; margin-bottom: 0.17in" align="right">
			  <font face="Cambria, serif">
				<b>La direction <br></b>
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
	},

	exportToPdf: (divId) => {
		const intern = {
			name: $(".name_text").val(),
			lastname: $(".lastname_text").val(),
			type: $(".typestage_text").val()
		};

		const filename = `ATTESTATION - ${intern.name}${intern.lastname}_stage${intern.type}.pdf`;
		document.title = filename;
		window.print();
		document.title = "Créateur des attestations de stage - ITQAN Labs";
	},

	printDiv: (divName) => {
		const intern = {
			name: $(".name_text").val(),
			lastname: $(".lastname_text").val(),
			type: $(".typestage_text").val()
		};

		const filename = `ATTESTATION - ${intern.name}${intern.lastname}_stage${intern.type}.pdf`;
		document.title = filename;
		window.print();
		document.title = "Créateur des attestations de stage - ITQAN Labs";
	}
};

// CSV Handler
const csvHandler = {
	expectedHeaders: ["prenom", "nom", "genre", "cin", "niveau", "etablissement", "typeStage", "titreProjet", "dateDebut", "dateFin"],

	process: (csvString) => {
		const pageContainer = document.getElementById("page");
		const csvResultContainer = document.getElementById("csvresult");

		try {
			const parsedData = Papa.parse(csvString, { header: true, skipEmptyLines: true }).data;

			// Validate headers
			const headers = Object.keys(parsedData[0]);
			if (!headers.every((header, i) => header === csvHandler.expectedHeaders[i])) {
				throw new Error("Invalid header row");
			}

			// Clear previous results
			csvResultContainer.innerHTML = "";

			// Add "All interns" option
			csvHandler.createInternSelector("all", "Tous les stagiaires", null, parsedData);

			// Process each row and create selector
			parsedData.forEach((row, index) => {
				if (index === 0) {
					// Display first intern by default
					pageContainer.innerHTML = certificateGenerator.buildPage(row);
				}

				csvHandler.createInternSelector(index + 1, `Stagiaire ${index + 1}`, row, null);
			});


		} catch (error) {
			console.error("Error processing CSV:", error);
		}
	},

	createInternSelector: (id, labelText, internData, allData) => {
		const pageContainer = document.getElementById("page");
		const csvResultContainer = document.getElementById("csvresult");

		// Create container
		const label = document.createElement("label");
		label.setAttribute("for", `csvresult_radio_${id}`);
		label.setAttribute("style", "display:block;background-color:white;padding:10px;margin-top:10px;border:3px solid #38937d;");
		label.setAttribute("id", `csvresult_${id}`);

		// Create radio button
		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "csvresult_radio");
		input.setAttribute("id", `csvresult_radio_${id}`);
		input.setAttribute("value", `${id}`);
		input.setAttribute("style", "cursor:pointer;");

		// Set first option as checked
		if ((id === 1) || (id === "all" && !document.querySelector("input[name='csvresult_radio']:checked"))) {
			input.setAttribute("checked", 'true');
		}

		// Create label content
		const titleElement = document.createElement("b");
		titleElement.innerHTML = `${labelText}: `;

		label.appendChild(input);
		label.appendChild(titleElement);

		// Add intern details if this is an individual intern
		if (internData) {
			const nameSpan = document.createElement("span");
			nameSpan.setAttribute("style", "background-color:yellow;");
			nameSpan.innerHTML = `${internData.prenom} ${internData.nom}`;

			const lineBreak = document.createElement("br");

			const establishmentLabel = document.createElement("b");
			establishmentLabel.innerHTML = `Etablissement: `;

			const establishmentValue = document.createTextNode(`${internData.etablissement}`);

			label.appendChild(nameSpan);
			label.appendChild(lineBreak);
			label.appendChild(establishmentLabel);
			label.appendChild(establishmentValue);
		}

		// Add event listener
		label.addEventListener("change", function (e) {
			if (e.target.checked) {
				if (id === "all") {
					// Generate certificates for all interns
					pageContainer.innerHTML = "";
					allData.forEach(intern => {
						pageContainer.innerHTML += certificateGenerator.buildPage(intern);
					});
				} else {
					// Generate certificate for selected intern
					pageContainer.innerHTML = certificateGenerator.buildPage(internData);
				}
			}
		});

		csvResultContainer.appendChild(label);
	}
};

// Form Controller
const formController = {
	init: () => {
		const pageContainer = document.getElementById("page");
		const internshipForm = document.getElementById("internshipprocessor");

		// Initialize with empty page
		pageContainer.innerHTML = certificateGenerator.buildPage();

		// Setup form inputs
		const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');
		inputs.forEach(input => {
			if (input.nodeName === "SELECT") {
				const select2 = $(input).select2();
				$(input).on("select2:select", formController.updateSpans);
			}
			input.addEventListener("input", formController.updateSpans);
			input.addEventListener("change", formController.updateSpans);
		});

		// Setup gender radio buttons
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

		$("#titreprojet").on("input", function () {
			const projectTitle = $(this).val();

			// Update the certificate display
			$(".titreprojet_text").text(projectTitle);

			// Collect current form data
			const internData = {
				prenom: $("#name").val() || DEFAULT_VALUES.prenom,
				nom: $("#lastname").val() || DEFAULT_VALUES.nom,
				genre: $("input[name='gender']:checked").val() === "male" ? "M" : "F",
				cin: $("#cin").val() || DEFAULT_VALUES.cin,
				niveau: $("#annee").val() || DEFAULT_VALUES.niveau,
				etablissement: $("#uni").val() || DEFAULT_VALUES.etablissement,
				typeStage: $("#typestage").val() || DEFAULT_VALUES.typeStage,
				titreProjet: $("#includeProjet").is(":checked") ? $("#titreprojet").val() : null,
				dateDebut: $("#du").val() || DEFAULT_VALUES.dateDebut,
				dateFin: $("#au").val() || DEFAULT_VALUES.dateFin
			};

			// Rebuild the certificate with the updated data
			const pageContainer = document.getElementById("page");
			pageContainer.innerHTML = certificateGenerator.buildPage(internData);
		});

		// Update the includeProjet change handler
		$("#includeProjet").change(function () {
			$("#titreprojet").prop("disabled", !this.checked);

			// Collect current form data
			const internData = {
				prenom: $("#name").val() || DEFAULT_VALUES.prenom,
				nom: $("#lastname").val() || DEFAULT_VALUES.nom,
				genre: $("input[name='gender']:checked").val() === "male" ? "M" : "F",
				cin: $("#cin").val() || DEFAULT_VALUES.cin,
				niveau: $("#annee").val() || DEFAULT_VALUES.niveau,
				etablissement: $("#uni").val() || DEFAULT_VALUES.etablissement,
				typeStage: $("#typestage").val() || DEFAULT_VALUES.typeStage,
				titreProjet: this.checked ? $("#titreprojet").val() : null,
				dateDebut: $("#du").val() || DEFAULT_VALUES.dateDebut,
				dateFin: $("#au").val() || DEFAULT_VALUES.dateFin
			};

			// Rebuild the certificate with the updated data
			const pageContainer = document.getElementById("page");
			pageContainer.innerHTML = certificateGenerator.buildPage(internData);
		});

	},

	updateSpans: (event) => {
		const target = event.target;
		const textSpans = document.querySelectorAll(`.${target.id}_text`);

		if (target.type === "date" && target.value) {
			try {
				const formattedDate = formatUtils.formatDate(target.value);
				textSpans.forEach(span => {
					span.textContent = formattedDate;
				});
			} catch (e) {
				console.error(`Error formatting date: ${e.message}`);
			}
		} else {
			textSpans.forEach(span => {
				span.textContent = event.params ? event.params.data.text : $(target).val();
			});
		}
	},

	disableFormControls: () => {
		const internshipForm = document.getElementById("internshipprocessor");
		const inputs = Array.from(internshipForm.querySelectorAll("input, select, textarea"));
		inputs.forEach(input => {
			input.disabled = true;
		});
	},

	enableFormControls: () => {
		const internshipForm = document.getElementById("internshipprocessor");
		const inputs = Array.from(internshipForm.querySelectorAll("input, select, textarea"));
		inputs.forEach(input => {
			input.disabled = false;
		});
	}
};

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", formController.init);

// Global functions to be accessible from HTML
window.printDiv = certificateGenerator.printDiv;