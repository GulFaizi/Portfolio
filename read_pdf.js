const fs = require('fs');
const PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("resume.txt", pdfParser.getRawTextContent());
    console.log("PDF parsed successfully by pdf2json");
});

pdfParser.loadPDF("client/src/assets/Gul Ahmad Faizi Resume.pdf");
