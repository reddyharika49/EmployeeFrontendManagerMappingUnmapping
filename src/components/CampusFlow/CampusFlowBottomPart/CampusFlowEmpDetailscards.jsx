import React from "react";
import { useParams } from "react-router-dom";
import styles from "../CampusFlowBottomPart/CampusFlowEmpDetailsCard.module.css";

// icons
import rightDividerIcon from "assets/Family/dividerRightImg.svg";
import leftDividerIcon from "assets/Family/dividerLeftImg.svg";
import profileIcon from "assets/Family/profile.svg";
import EmployeeDetailsCard from "widgets/EmployeeDetailsCard/EmployeeDetailsCard";

/**
 * STATIC DATA PER DEPARTMENT
 * (Later this will be replaced by API calls)
 */
const employeeDataByDepartment = {
  academics: Array.from({ length: 8 }, () => ({
    name: "Academic Employee",
    emp_id: "EMP ID: ACD 1001",
    role: "Professor",
    phoneNumber: "9876543210",
    email: "academics@company.com",
  })),

  management: Array.from({ length: 8 }, () => ({
    name: "Management Employee",
    emp_id: "EMP ID: MGT 2001",
    role: "Manager",
    phoneNumber: "9876501111",
    email: "management@company.com",
  })),

  "finance-accounts": Array.from({ length: 8 }, () => ({
    name: "Finance Employee",
    emp_id: "EMP ID: FIN 3001",
    role: "Accountant",
    phoneNumber: "9876502222",
    email: "finance@company.com",
  })),

  marketing: Array.from({ length: 8 }, () => ({
    name: "Marketing Employee",
    emp_id: "EMP ID: MKT 4001",
    role: "Marketing Executive",
    phoneNumber: "9876503333",
    email: "marketing@company.com",
  })),

  operations: Array.from({ length: 8 }, () => ({
    name: "Operations Employee",
    emp_id: "EMP ID: OPS 5001",
    role: "Operations Lead",
    phoneNumber: "9876504444",
    email: "operations@company.com",
  })),

  "personal-admin": Array.from({ length: 8 }, () => ({
    name: "Admin Employee",
    emp_id: "EMP ID: ADM 6001",
    role: "Admin Officer",
    phoneNumber: "9876505555",
    email: "admin@company.com",
  })),

  "purchase-logistics": Array.from({ length: 8 }, () => ({
    name: "Logistics Employee",
    emp_id: "EMP ID: LOG 7001",
    role: "Logistics Manager",
    phoneNumber: "9876506666",
    email: "logistics@company.com",
  })),

  it: Array.from({ length: 8 }, () => ({
    name: "IT Employee",
    emp_id: "EMP ID: IT 8001",
    role: "Software Engineer",
    phoneNumber: "9876507777",
    email: "it@company.com",
  })),

  legal: Array.from({ length: 8 }, () => ({
    name: "Legal Employee",
    emp_id: "EMP ID: LEG 9001",
    role: "Legal Advisor",
    phoneNumber: "9876508888",
    email: "legal@company.com",
  })),

  hr: Array.from({ length: 8 }, () => ({
    name: "HR Employee",
    emp_id: "EMP ID: HR 10001",
    role: "HR Executive",
    phoneNumber: "9876509999",
    email: "hr@company.com",
  })),

  sales: Array.from({ length: 8 }, () => ({
    name: "Sales Employee",
    emp_id: "EMP ID: SAL 11001",
    role: "Sales Executive",
    phoneNumber: "9876510000",
    email: "sales@company.com",
  })),

  "academic-analytics": Array.from({ length: 8 }, () => ({
    name: "Analytics Employee",
    emp_id: "EMP ID: ANA 12001",
    role: "Data Analyst",
    phoneNumber: "9876511111",
    email: "analytics@company.com",
  })),
};

const CampusFlowBioDataCard = () => {
  const { department } = useParams();

  // Fallback to academics if invalid or missing department
  const employeeList =
    employeeDataByDepartment[department] ||
    employeeDataByDepartment.academics;

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardGrid}>
        {employeeList.map((emp, index) => (
          <EmployeeDetailsCard
            key={index}
            titleLable="Employee Name"
            name={emp.name}
            emp_id={emp.emp_id}
            role={emp.role}
            profileIcon={profileIcon}
            leftDividerIcon={leftDividerIcon}
            rightDividerIcon={rightDividerIcon}
            phoneNumber={emp.phoneNumber}
            email={emp.email}
          />
        ))}
      </div>

      {/* Pagination footer (static for now) */}
      <div className={styles.footer}>
        <span>Showing 1 to 8 of 54 Entries</span>
        <div className={styles.pagination}>
          <button className={styles.prev}>Prev</button>
          <button className={styles.next}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CampusFlowBioDataCard;
