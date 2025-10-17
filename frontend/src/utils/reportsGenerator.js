// // Replace this with your actual Cairo font base64 (TTF converted)

// import jsPDF from "jspdf";
// import { cairoFontBase64 } from "./cairoFontBast64";

// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// // Assign vfs to pdfMake
// // pdfMake.vfs = pdfFonts.pdfMake.vfs;
// pdfMake.vfs["Cairo-Regular.ttf"] = cairoFontBase64;

// // Register custom Cairo font
// pdfMake.fonts = {
//   Cairo: {
//     normal: "Cairo-Regular.ttf",
//     bold: "Cairo-Bold.ttf",
//     italics: "Cairo-Italic.ttf",
//     bolditalics: "Cairo-BoldItalic.ttf",
//   },
// };

// export function generateArabicProductReport(
//   companyDetails,
//   productName,
//   movements,
//   rowsPerPage = 15
// ) {
//   // Split movements into pages
//   const tablePages = [];
//   for (let i = 0; i < movements.length; i += rowsPerPage) {
//     tablePages.push(movements.slice(i, i + rowsPerPage));
//   }

//   // Build table body
//   const buildTableBody = (rows) => {
//     const body = [
//       [
//         { text: "التاريخ", bold: true },
//         { text: "النوع", bold: true },
//         { text: "الكمية", bold: true },
//         { text: "ملاحظات", bold: true },
//       ],
//     ];
//     rows.forEach((row) => {
//       body.push([row.date, row.type, row.quantity.toString(), row.notes]);
//     });
//     return body;
//   };

//   // Prepare content
//   const content = [];
//   tablePages.forEach((pageRows, pageIndex) => {
//     if (pageIndex > 0) content.push({ text: "", pageBreak: "before" });

//     // Header
//     content.push({
//       text: `${companyDetails.name}\n${companyDetails.address}\n${companyDetails.phone}`,
//       style: "header",
//       alignment: "center",
//       margin: [0, 0, 0, 20],
//     });

//     // Product name
//     content.push({
//       text: `اسم المنتج: ${productName}`,
//       style: "productName",
//       margin: [0, 0, 0, 10],
//     });

//     // Table
//     content.push({
//       table: {
//         headerRows: 1,
//         widths: ["*", "*", "*", "*"],
//         body: buildTableBody(pageRows),
//       },
//       layout: "lightHorizontalLines",
//     });
//   });

//   const docDefinition = {
//     content: content,
//     defaultStyle: { font: "Cairo" },
//     pageSize: "A4",
//     pageMargins: [40, 60, 40, 60],
//   };

//   // Open PDF in new tab
//   pdfMake.createPdf(docDefinition).open();
// }

// // Example usage:
// const companyDetails = {
//   name: "شركة المثال المحدودة",
//   address: "الرياض، المملكة العربية السعودية",
//   phone: "+966 555 555 555",
// };

// const productName = "منتج تجريبي";

// const movements = Array.from({ length: 40 }, (_, i) => ({
//   date: `2025-10-${i < 9 ? "0" + (i + 1) : i + 1}`,
//   type: i % 2 === 0 ? "صرف" : "إضافة",
//   quantity: Math.floor(Math.random() * 100) + 1,
//   notes: `ملاحظة ${i + 1}`,
// }));

// // Generate report
// // generateArabicProductReport(companyDetails, productName, movements);

// export function generateProductMovementReport(product, movements1) {
//   const doc = new jsPDF({
//     orientation: "p",
//     unit: "mm",
//     format: "a4",
//   });

//   // Embed Cairo font
//   doc.addFileToVFS("Cairo-Regular.ttf", cairoFontBase64);
//   doc.addFont("Cairo-Regular.ttf", "Cairo", "normal");
//   doc.setFont("Cairo");
//   doc.setFontSize(12);

//   // Draw header initially
//   drawHeader();

//   // Product name
//   doc.setFontSize(13);
//   doc.text("تقرير حركات المنتج: مروحة كهربائية", 200, 40, { align: "right" });

//   // Table setup
//   const startY = 50;
//   let y = startY;
//   const rowHeight = 10;
//   const rowsPerPage = 15;

//   // Example data
//   const movements = Array.from({ length: 47 }, (_, i) => ({
//     date: `2025-10-${i + 1}`,
//     type: i % 2 === 0 ? "إدخال" : "إخراج",
//     qty: Math.floor(Math.random() * 10 + 1),
//     note: `ملاحظة ${i + 1}`,
//   }));

//   // Draw one row
//   function drawRow(row, yPos) {
//     doc.setFontSize(10);
//     doc.rect(10, yPos, 190, rowHeight); // border
//     doc.text(row.date, 190, yPos + 7, { align: "right" });
//     doc.text(row.type, 150, yPos + 7, { align: "right" });
//     doc.text(row.qty.toString(), 110, yPos + 7, { align: "right" });
//     doc.text(row.note, 70, yPos + 7, { align: "right" });
//   }

//   drawTableHeader(y);

//   let count = 0;
//   for (let i = 0; i < movements.length; i++) {
//     count++;
//     y += rowHeight;
//     drawRow(movements[i], y);

//     if (count === rowsPerPage && i < movements.length - 1) {
//       // Page break
//       doc.addPage();
//       drawHeader();
//       doc.text("تقرير حركات المنتج: مروحة كهربائية", 200, 40, {
//         align: "right",
//       });
//       y = startY;
//       drawTableHeader(y);
//       count = 0;
//     }
//   }

//   // Open in new tab
//   window.open(doc.output("bloburl"), "_blank");
// }

// // Company info (Header)
// function drawHeader() {
//   doc.setFontSize(14);
//   doc.text("شركة السلفى التجارية", 200, 15, { align: "right" });
//   doc.setFontSize(10);
//   doc.text("العنوان: مكة المكرمة - شارع إبراهيم الخليل", 200, 22, {
//     align: "right",
//   });
//   doc.text("الهاتف: 0550184498", 200, 28, { align: "right" });
//   doc.line(10, 32, 200, 32); // line under header
// }

// // Draw table header
// function drawTableHeader(yPos) {
//   doc.setFontSize(11);
//   doc.setFillColor(230, 230, 230);
//   doc.rect(10, yPos, 190, rowHeight, "F");
//   doc.text("التاريخ", 190, yPos + 7, { align: "right" });
//   doc.text("النوع", 150, yPos + 7, { align: "right" });
//   doc.text("الكمية", 110, yPos + 7, { align: "right" });
//   doc.text("الملاحظات", 70, yPos + 7, { align: "right" });
// }
