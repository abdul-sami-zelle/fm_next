// components/invoicePDF.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateInvoicePDF = () => {
  const doc = new jsPDF();

  // Your Base64 Logo (small PNG recommended)
  const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...'; // full base64 string here

  // Title and Logo
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Invoice', 14, 15); // Left side

  // Add Logo to Right
  doc.addImage(logoBase64, 'PNG', 160, 5, 40, 15); // (x, y, width, height)

  // Continue with your PDF content...
  doc.text('Invoice to: John Mosley', 14, 30);
  // etc...

  doc.save('invoice-furnituremecca.pdf');

  // Invoice to/from
  doc.setFontSize(10);
  doc.text("Invoice to:\nJohn Mosley\nhouse 13 street 5 Area City\n125153554545", 14, 25);
  doc.text("Invoice from:\n101 East Venango St\n(349) 898-4389\nmeccacustomercare@gmail.com", 120, 25);

  // Payment Method
  doc.text("Payment Method:\nBank Transfer\nER73829 27382 28338", 14, 55);

  // Invoice #
  doc.text("Invoice # INV-2312 312312312355", 120, 55);
  doc.text("Dated: 12 July 2025", 120, 60);

  // Table data
  autoTable(doc, {
    head: [['Item ID', 'Name', 'Price', 'Protected', 'Qty', 'Total']],
    body: [
      ['1657', 'Infinity Modular Sectional', '$1,299', 'Yes', '1', '$1,299'],
      ['1345', 'Haven 3 PC Sectional', '$1,299', 'Yes', '2', '$2,998'],
      ['1289', 'Micha TV Stand with Electric Fireplace', '$499', 'Yes', '1', '$499'],
    ],
    startY: 70
  });

  // Totals
  let finalY = doc.lastAutoTable.finalY + 10;
  const totals = [
    ['Sub Total', '$3,097'],
    ['Professional Assembly', '$199'],
    ['Protection Plan', '$199'],
    ['Shipping', 'Free'],
    ['Tax', '$263'],
    ['Total Amount', '$3,559'],
  ];
  totals.forEach(([label, value]) => {
    doc.text(label, 120, finalY);
    doc.text(value, 170, finalY, { align: 'right' });
    finalY += 6;
  });

  // Notes
  finalY += 10;
  doc.setFontSize(8);
  doc.text(
    `Note: Customer must provide valid phone number and address for delivery otherwise Furniture Mecca\n` +
    `will not deliver any merchandise.\n` +
    `El cliente debe proporcionar un número de teléfono y una dirección válidos para la entrega; de lo contrario, Furniture Mecca no\n` +
    `entregará ninguna mercancía.`, 14, finalY
  );

  finalY += 20;
  doc.text(
    `Note: Pickup available by appointment only on Monday, Tuesday, Thursday, Friday and Saturday. Call 215-352-1600 for Appointment.\n` +
    `All orders must be paid in full 72 hours prior to delivery or 72 hours prior to transport of merchandise to branch store for customer pickup.\n` +
    `By signing here the customer has read the policy and agreed to the store’s terms and conditions.`, 14, finalY
  );

  // Signature
  finalY += 30;
  doc.text("Customer Signature", 14, finalY);

  // Footer
  finalY += 10;
  doc.text(
    `Recogida disponible solo con cita previa los lunes, martes, jueves, viernes y sábados. Llame al 215-352-1600 para programar una cita.\n` +
    `Opt in to receive text and email blasts. Reply HELP for help and STOP to opt-out. Message and Data rates may apply.\n` +
    `SMS SHARING DISCLOSURE: No mobile data will be shared with third parties/affiliates for marketing/ promotional purpose at any time.`, 14, finalY + 10
  );

  // Save PDF
  doc.save('invoice-furnituremecca.pdf');
};

export default generateInvoicePDF;
