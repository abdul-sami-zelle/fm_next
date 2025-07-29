// components/invoicePDF.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateInvoicePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');

    // Add the logo to top right
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Invoice', 10, 12); // Left side


    doc.addImage('/Assets/Logo/new-main-logo.png', 'PNG', 150, 5, 50, 12);

    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text('Note: Customer must provide valid phone number and address for delivery otherwise Furniture Mecca will not deliver any merchandise.', 10, 22)

    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text('El cliente debe proporcionar un número de teléfono y una dirección válidos para la entrega; de lo contrario, Furniture Mecca no entregará ', 10, 26)
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text('ninguna mercancía.', 10, 29);


    // invoice numbr and date
    const pageWidth = doc.internal.pageSize.getWidth();
    const containerX = 10;
    const containerY = 35;
    const containerWidth = pageWidth - 2 * containerX; // full width with 10px margin
    const containerHeight = 10;
    const borderRadius = 1;

    // ✅ Simulate background box with border radius (rounded rect)
    doc.setFillColor(234, 234, 234); // light gray background
    doc.setDrawColor(234, 234, 234); // light border
    doc.roundedRect(containerX, containerY, containerWidth, containerHeight, borderRadius, borderRadius, 'FD'); // F = fill, D = draw border

    // ✅ Inside: text left & right — like justify-content: space-between
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');

    const leftText = 'Invoice #';
    const rightText = 'Dated: ';



    doc.text(leftText, containerX + 3, containerY + 6.5); // left text inside box

    doc.text(rightText, containerX + containerWidth - 19, containerY + 6.5, { align: 'right' }); // right text


    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');

    const leftTextContent = 'INV-2312 312312312355';
    const rightTextContent = '12 July 2025';


    doc.text(leftTextContent, containerX + 19.5, containerY + 6.5)
    doc.text(rightTextContent, containerX + containerWidth - 3, containerY + 6.5, { align: 'right' })

    //   Add more PDF content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('Invoice to:', 10, 53);
    doc.text('Invoice From:', 90, 53);
    doc.text('Payment Method:', 160, 53);

    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text('101 East Venango St', 10, 58);
    doc.text('(349) 898-4389', 10, 62);
    doc.text('meccacustomercare@gmail.com', 10, 66);

    doc.text('John Mosley', 90, 58);
    doc.text('house 13 street 5 Area City', 90, 62);
    doc.text('125153554545', 90, 66);

    doc.text('Bank Transfer', 160, 58);
    doc.text('ER73829 27382 28338', 160, 62);

    // Table data
    autoTable(doc, {
        head: [['Item ID', 'Name', 'Price', 'Protected', 'Qty', 'Total']],
        body: [
            ['1657', 'Infinity Modular Sectional', '$1,299', 'Yes', '1', '$1,299'],
            ['1345', 'Haven 3 PC Sectional', '$1,299', 'Yes', '2', '$2,998'],
            ['1289', 'Micha TV Stand with Electric Fireplace', '$499', 'Yes', '1', '$499'],
        ],
        startY: 72,
        margin: { left: 10, right: 10 }, // ✅ remove side margins
        tableWidth: 'auto',
        headStyles: {
            fillColor: [89, 89, 89], // ✅ This is #595959
            textColor: 255,          // white text
            fontStyle: 'bold',
            fontSize: 8,
            halign: 'left',
        },
        bodyStyles: {
            fontSize: 8,            // ✅ body font size
            halign: 'left',
        },
        didParseCell: function (data) {
            // ✅ Force row height to 28 for header and body
            data.cell.height = 28;
        }
    });

    const pageHeight = doc.internal.pageSize.getHeight(); // total page height
    const footerHeight = 18;
    const signatureContainer = 35;
    const totalContainerHeight = 40;

    const totalContainerY = pageHeight - footerHeight - signatureContainer - totalContainerHeight;

    // doc.rect(0, totalContainerY, pageWidth, totalContainerHeight)

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text("Sub Total", 120, totalContainerY + 5)
    doc.text("Professional Assembly", 120, totalContainerY + 11)
    doc.text("Protection Plan", 120, totalContainerY + 18)
    doc.text("Shipping", 120, totalContainerY + 24)
    doc.text("Tax", 120, totalContainerY + 31)



    

    doc.text("Total Amount", 120, totalContainerY + 38)

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text("$3097", 180, totalContainerY + 5)
    doc.text("$199", 180, totalContainerY + 11)
    doc.text("$199", 180, totalContainerY + 18)
    doc.text("Free", 180, totalContainerY + 24)
    doc.text("$263", 180, totalContainerY + 31)
    doc.text("$3,559", 180, totalContainerY + 38)





    const signatureContainerY = pageHeight - footerHeight - signatureContainer
    // doc.setFillColor(255, 255, 255); // white
    // doc.setDrawColor(0);
    // doc.rect(0, signatureContainerY, pageWidth, signatureContainer, 'FD');

    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.text("Note: Pickup available by appointment only on Monday, Tuesday, Thursday, Friday and Saturday. Call 215-352-1600 for Appointment.", 10, signatureContainerY + 5)
    doc.text('Recogida disponible solo con cita previa los lunes, martes, jueves, viernes y sábados. Llame al 215-352-1600 para programar una cita.', 10, signatureContainerY + 8)
    doc.text('All orders must be paid in full 72 hours prior to delivery or 72 hours prior to transport of merchandise to branch store for customer pickup.', 10, signatureContainerY + 14)

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Customer Signature ________________________', 10, signatureContainerY + 22)


    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.text("By signing here the customer has read the policy and agreed to the store’s terms and conditions.", 10, signatureContainerY + 30)


    // in jsPDF units (approx = px)
    const footerY = pageHeight - footerHeight;

    // ✅ Set footer background color (e.g., #EAEAEA → rgb(234, 234, 234))
    doc.setFillColor(234, 234, 234);
    doc.rect(0, footerY, pageWidth, footerHeight, 'F'); // x, y, width, height, 'F' for fill

    const checkboxSize = 4;
    const checkboxX = 10;
    const checkboxRadius = 1;
    const checkboxY = footerY + 3;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(0); // black border
    doc.setLineWidth(0.2);
    doc.roundedRect(checkboxX, checkboxY, checkboxSize, checkboxSize, checkboxRadius, checkboxRadius, 'FD'); // checkbox

    // ✅ Add label text next to checkbox
    const labelText = 'I agree to the terms and conditions';
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(labelText, checkboxX + checkboxSize + 2.5, checkboxY + 3.5);

    doc.setFontSize(7);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('Reply HELP for help and STOP to opt-out. Message and Data rates may apply. ', 3 + checkboxSize + 2.5, checkboxY + 9)
    doc.text('SMS SHARING DISCLOSURE: No mobile data will be shared with third parties/affiliates for marketing/ promotional purpose at any time.', 3 + checkboxSize + 2.5, checkboxY + 12)


    // Save PDF
    doc.save('invoice-furnituremecca.pdf');
};

export default generateInvoicePDF;
