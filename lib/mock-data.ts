import { Client, Employee, Project } from './types';

export const mockClients: Client[] = [
  {
    Client_ID: 1,
    Organization_Name: "Larsen & Toubro Construction",
    Office_Address: "Mumbai, Maharashtra",
    Contact_Person_Name: "Rajesh Mehta",
    Contact_Number: "+91-9876543210",
    Contact_Email: "rajesh.m@lntecc.com",
    GSTIN_UIN: "27AABCU1234F1Z5",
    State_Name: "Maharashtra",
    State_Code: "27"
  },
  {
    Client_ID: 2,
    Organization_Name: "Mumbai Metropolitan Region Development Authority (MMRDA)",
    Office_Address: "Bandra Kurla Complex, Mumbai",
    Contact_Person_Name: "Sanjay Kumar",
    Contact_Number: "+91-9988776655",
    Contact_Email: "projects@mmrda.gov.in",
    GSTIN_UIN: "27AAALM1234F1Z5",
    State_Name: "Maharashtra",
    State_Code: "27"
  }
];

export const mockEmployees: Employee[] = [
  {
    Employee_ID: 1,
    Department_ID: 1,
    Role_ID: 1,
    Full_Name: "Dr. A. P. Kelkar",
    Designation: "Director",
    PDF_Balance: 150000.00,
    Role_Name: "DIRECTOR"
  },
  {
    Employee_ID: 2,
    Department_ID: 2, // Civil Engineering
    Role_ID: 2,
    Full_Name: "Dr. S. M. Patel",
    Designation: "Head of Department, Civil",
    PDF_Balance: 85000.00,
    Role_Name: "HOD"
  },
  {
    Employee_ID: 3,
    Department_ID: 2,
    Role_ID: 3,
    Full_Name: "Prof. R. D. Sharma",
    Designation: "Professor",
    PDF_Balance: 45000.00,
    Role_Name: "PROJECT_COORDINATOR"
  }
];

export const mockProjects: Project[] = [
  {
    Project_ID: 101,
    Project_Number: "VJTI/CE/2026/001",
    Client_ID: 1,
    Department_ID: 2,
    Coordinator_ID: 3,
    Project_Title: "Structural Audit of Proposed Metro Line 4 Stations",
    Current_Status: "REQUEST_BY_EXTERNAL_ORG",
    Agency_Appointed: null,
    Cost_Of_Work: 2500000.00,
    Contract_Period: "3 Months",
    Liability_Period: "1 Year",
    Proof_Consultant: null,
    PM_Consultant: null,
    Physical_Progress: "0%",
    Est_Person_Days: 45,
    Est_Site_Visits: 10,
    Proposed_Fee_Pct: null,
    Start_Date: null
  },
  {
    Project_ID: 102,
    Project_Number: "VJTI/CE/2026/002",
    Client_ID: 2,
    Department_ID: 2,
    Coordinator_ID: 3,
    Project_Title: "Third Party Quality Audit (TPQA) for Elevated Road Corridor",
    Current_Status: "TAX_INVOICE_AND_RECEIPT",
    Agency_Appointed: "Quality Checkers Pvt Ltd",
    Cost_Of_Work: 8500000.00,
    Contract_Period: "12 Months",
    Liability_Period: "3 Years",
    Proof_Consultant: "Design Verification Corp",
    PM_Consultant: "Build Management Sys",
    Physical_Progress: "40%",
    Est_Person_Days: 120,
    Est_Site_Visits: 24,
    Proposed_Fee_Pct: 15.0,
    Start_Date: "2026-01-15"
  }
];
