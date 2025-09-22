const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate contract PDF document
 * @param {Object} contract - Contract object with populated fields
 * @returns {Promise<String>} - URL to the generated document
 */
exports.generateContract = async (contract) => {
  return new Promise((resolve, reject) => {
    try {
      // Create document folder if doesn't exist
      const uploadDir = path.join(__dirname, '../public/contracts');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const filename = `contract_${contract._id}_${uuidv4()}.pdf`;
      const filePath = path.join(uploadDir, filename);
      
      // Create PDF document
      const doc = new PDFDocument({ 
        size: 'A4',
        info: {
          Title: `${contract.contractType.name} - Contract`,
          Author: 'Legal Services Platform',
        },
        margin: 50,
        bufferPages: true
      });
      
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      
      // Add header
      doc.font('Helvetica-Bold')
         .fontSize(18)
         .text('LEGAL CONTRACT AGREEMENT', { align: 'center' })
         .moveDown(0.5);
         
      doc.fontSize(14)
         .text(`${contract.contractType.name.toUpperCase()}`, { align: 'center' })
         .moveDown(1.5);
      
      // Add contract metadata
      doc.font('Helvetica-Bold')
         .fontSize(12)
         .text('CONTRACT DETAILS')
         .moveDown(0.5);
      
      doc.font('Helvetica')
         .fontSize(10)
         .text(`Contract ID: ${contract._id}`)
         .text(`Issue Date: ${new Date().toLocaleDateString()}`)
         .text(`Expiry Date: ${new Date(new Date().setMonth(new Date().getMonth() + (contract.contractType.validityPeriod || 12))).toLocaleDateString()}`)
         .moveDown(1);
      
      // Add parties information
      doc.font('Helvetica-Bold')
         .fontSize(12)
         .text('PARTIES')
         .moveDown(0.5);
      
      doc.font('Helvetica-Bold')
         .fontSize(10)
         .text('CLIENT:')
         .font('Helvetica')
         .text(`Name: ${contract.client.name}`)
         .text(`Email: ${contract.client.email}`)
         .text(`Phone: ${contract.client.phone}`)
         .text(`Address: ${contract.client.address ? 
           `${contract.client.address.street}, ${contract.client.address.city}, ${contract.client.address.state}, ${contract.client.address.zipCode}, ${contract.client.address.country}` : 
           'Address not provided'}`);
      
      doc.moveDown(0.5)
         .font('Helvetica-Bold')
         .text('LAWYER:')
         .font('Helvetica')
         .text(`Name: ${contract.lawyer.name}`)
         .text(`Email: ${contract.lawyer.email}`)
         .text(`Phone: ${contract.lawyer.phone}`)
         .text(`Bar Association Number: ${contract.lawyer.barAssociationNumber}`)
         .moveDown(1);
      
      // Add contract details
      doc.font('Helvetica-Bold')
         .fontSize(12)
         .text('CONTRACT TERMS AND CONDITIONS')
         .moveDown(0.5);
      
      // Add contract data
      doc.font('Helvetica')
         .fontSize(10);
      
      Object.entries(contract.contractData).forEach(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        
        doc.font('Helvetica-Bold')
           .text(`${formattedKey}:`, { continued: true })
           .font('Helvetica')
           .text(` ${value}`)
           .moveDown(0.3);
      });
      
      doc.moveDown(1);
      
      // Add legal clauses based on contract type
      doc.font('Helvetica-Bold')
         .fontSize(12)
         .text('LEGAL CLAUSES')
         .moveDown(0.5);
      
      doc.font('Helvetica')
         .fontSize(10)
         .text(generateLegalClauses(contract.contractType.name))
         .moveDown(1);
      
      // Add signatures section
      doc.font('Helvetica-Bold')
         .fontSize(12)
         .text('SIGNATURES')
         .moveDown(1);
      
      doc.font('Helvetica')
         .fontSize(10);
      
      // Client signature
      doc.text('Client:', { continued: true })
         .text(`    ${contract.client.name}`, { align: 'left' })
         .moveDown(0.2)
         .text('Signature: ____________________', { align: 'left' })
         .moveDown(0.2)
         .text(`Date: ____________________`, { align: 'left' })
         .moveDown(1);
      
      // Lawyer signature
      doc.text('Lawyer:', { continued: true })
         .text(`    ${contract.lawyer.name}`, { align: 'left' })
         .moveDown(0.2)
         .text('Signature: ____________________', { align: 'left' })
         .moveDown(0.2)
         .text(`Date: ____________________`, { align: 'left' })
         .moveDown(2);
      
      // Add footer
      doc.fontSize(8)
         .text('This is a legally binding document. Keep it for your records.', { align: 'center' })
         .moveDown(0.5)
         .text(`Generated on ${new Date().toLocaleString()}`, { align: 'center' });
      
      // Add page numbers
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc.fontSize(8)
           .text(
              `Page ${i + 1} of ${pageCount}`,
              doc.page.margins.left,
              doc.page.height - doc.page.margins.bottom - 20,
              { align: 'center' }
           );
      }
      
      // Finalize the PDF and end the stream
      doc.end();
      
      stream.on('finish', () => {
        const documentUrl = `/contracts/${filename}`;
        resolve(documentUrl);
      });
      
      stream.on('error', (err) => {
        console.error('Error generating contract PDF:', err);
        reject(err);
      });
      
    } catch (err) {
      console.error('Contract generation error:', err);
      reject(err);
    }
  });
};

/**
 * Generate legal clauses based on contract type
 * @param {String} contractType - Type of contract
 * @returns {String} - Legal clauses text
 */
function generateLegalClauses(contractType) {
  // Base clauses for all contracts
  let clauses = [
    "1. ENTIRE AGREEMENT: This document constitutes the entire agreement between the parties with respect to the subject matter hereof.",
    
    "2. GOVERNING LAW: This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the service is provided, without giving effect to any choice of law or conflict of law provisions.",
    
    "3. AMENDMENTS: This Agreement may only be amended in writing signed by both parties.",
    
    "4. SEVERABILITY: If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.",
    
    "5. DISPUTE RESOLUTION: Any dispute arising out of or in connection with this contract shall first be attempted to be resolved through mediation before pursuing any other legal remedies."
  ];
  
  // Add specific clauses based on contract type
  switch (contractType.toLowerCase()) {
    case 'employment contract':
      clauses = clauses.concat([
        "6. CONFIDENTIALITY: The Employee shall not, during the term of employment and thereafter, disclose to any third party any confidential information related to the Employer's business.",
        
        "7. NON-COMPETE: The Employee agrees not to engage in any competing business within a radius of 50 miles for a period of one year after termination of employment.",
        
        "8. TERMINATION: Either party may terminate this Agreement with 30 days written notice."
      ]);
      break;
      
    case 'lease agreement':
      clauses = clauses.concat([
        "6. MAINTENANCE: The Landlord shall be responsible for major repairs, while the Tenant shall be responsible for minor maintenance and keeping the premises clean.",
        
        "7. SECURITY DEPOSIT: The Security Deposit shall be returned within 30 days of the termination of this Agreement, less any deductions for damages beyond normal wear and tear.",
        
        "8. SUBLETTING: The Tenant shall not assign or sublet the premises without the written consent of the Landlord."
      ]);
      break;
      
    case 'non-disclosure agreement':
      clauses = clauses.concat([
        "6. DEFINITION OF CONFIDENTIAL INFORMATION: 'Confidential Information' means any information disclosed by one party to the other that is marked as confidential or would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.",
        
        "7. EXCLUSIONS: Confidentiality obligations do not apply to information that was known prior to disclosure, becomes publicly available through no fault of the receiving party, or is independently developed by the receiving party.",
        
        "8. TERM OF CONFIDENTIALITY: The obligations of confidentiality shall survive the termination of this Agreement for a period of five (5) years."
      ]);
      break;
      
    case 'service agreement':
      clauses = clauses.concat([
        "6. SCOPE OF SERVICES: The Service Provider shall perform the services outlined in this Agreement with reasonable skill, care, and diligence.",
        
        "7. PAYMENT TERMS: Payment shall be made within 30 days of receipt of invoice. Late payments shall incur interest at the rate of 1.5% per month.",
        
        "8. WARRANTIES: The Service Provider warrants that services will be performed in a professional and workmanlike manner in accordance with industry standards."
      ]);
      break;
      
    case 'purchase agreement':
      clauses = clauses.concat([
        "6. TRANSFER OF TITLE: Title to the goods shall pass to the Buyer upon full payment of the purchase price.",
        
        "7. WARRANTIES: The Seller warrants that the goods are free from defects in materials and workmanship for a period of one year from the date of delivery.",
        
        "8. INSPECTION: The Buyer shall inspect the goods upon delivery and notify the Seller of any defects within 7 days."
      ]);
      break;
      
    case 'partnership agreement':
      clauses = clauses.concat([
        "6. PROFIT AND LOSS: Profits and losses of the Partnership shall be divided among the Partners in proportion to their respective capital contributions.",
        
        "7. MANAGEMENT: Each Partner shall have an equal right in the management of the Partnership business.",
        
        "8. WITHDRAWAL: A Partner may withdraw from the Partnership with 90 days written notice to all other Partners."
      ]);
      break;
      
    default:
      // Generic additional clauses for any other contract type
      clauses = clauses.concat([
        "6. NOTICES: All notices required or permitted under this Agreement shall be in writing and shall be deemed delivered when delivered in person or by mail.",
        
        "7. ASSIGNMENT: Neither party may assign their rights or obligations under this Agreement without the prior written consent of the other party.",
        
        "8. FORCE MAJEURE: Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control."
      ]);
  }
  
  return clauses.join('\n\n');
}