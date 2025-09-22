const mongoose = require('mongoose');
const ContractType = require('../models/ContractType');

// Contract types seed data
const contractTypeData = [
  {
    name: 'Employment Contract',
    description: 'Legal agreement between employer and employee outlining terms of employment',
    requiredFields: [
      'employerName',
      'employeeName',
      'position',
      'startDate',
      'salary',
      'paymentFrequency',
      'workHours',
      'benefitsProvided',
      'terminationNotice',
      'probationPeriod'
    ],
    template: 'employment_contract_template',
    validityPeriod: 12
  },
  {
    name: 'Lease Agreement',
    description: 'Contract between landlord and tenant for the rental of property',
    requiredFields: [
      'landlordName',
      'tenantName',
      'propertyAddress',
      'leaseStartDate',
      'leaseEndDate',
      'monthlyRent',
      'securityDeposit',
      'petsAllowed',
      'utilities',
      'maintenanceResponsibilities'
    ],
    template: 'lease_agreement_template',
    validityPeriod: 12
  },
  {
    name: 'Non-Disclosure Agreement',
    description: 'Confidentiality agreement to protect sensitive information',
    requiredFields: [
      'disclosingParty',
      'receivingParty',
      'purposeOfDisclosure',
      'definitionOfConfidential',
      'exclusions',
      'timeframeOfConfidentiality',
      'returnOfMaterials',
      'remediesForBreach',
      'governingLaw',
      'jurisdictionForDisputes'
    ],
    template: 'nda_template',
    validityPeriod: 36
  },
  {
    name: 'Service Agreement',
    description: 'Contract between service provider and client for professional services',
    requiredFields: [
      'serviceProviderName',
      'clientName',
      'serviceDescription',
      'deliverables',
      'timeline',
      'paymentTerms',
      'totalFee',
      'intellectualPropertyRights',
      'warrantyPeriod',
      'terminationConditions'
    ],
    template: 'service_agreement_template',
    validityPeriod: 6
  },
  {
    name: 'Purchase Agreement',
    description: 'Contract for the sale and purchase of goods or property',
    requiredFields: [
      'sellerName',
      'buyerName',
      'productDescription',
      'quantity',
      'unitPrice',
      'totalPurchasePrice',
      'deliveryDate',
      'deliveryLocation',
      'paymentMethod',
      'warrantyDetails'
    ],
    template: 'purchase_agreement_template',
    validityPeriod: 3
  },
  {
    name: 'Partnership Agreement',
    description: 'Legal agreement between two or more partners forming a business partnership',
    requiredFields: [
      'partnershipName',
      'businessPurpose',
      'partnerNames',
      'capitalContributions',
      'profitSharingRatio',
      'managementStructure',
      'decisionMakingProcess',
      'addingNewPartners',
      'withdrawalProcess',
      'disputeResolutionMethod'
    ],
    template: 'partnership_agreement_template',
    validityPeriod: 24
  }
];

// Function to seed contract types
async function seedContractTypes() {
  try {
    // Clear existing data
    await ContractType.deleteMany({});
    console.log('Previous contract types removed');

    // Insert new data
    const seededTypes = await ContractType.insertMany(contractTypeData);
    console.log(`${seededTypes.length} contract types seeded successfully`);
    
    return seededTypes;
  } catch (error) {
    console.error('Error seeding contract types:', error);
    throw error;
  }
}

module.exports = seedContractTypes;