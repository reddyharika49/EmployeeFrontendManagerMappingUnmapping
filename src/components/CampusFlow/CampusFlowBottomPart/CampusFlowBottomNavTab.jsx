import styles from "./CampusFlowBottomNavTab.module.css";
import { NavLink } from "react-router-dom";

const departments = [
  { label: "Academics", path: "academics" },
  { label: "Management", path: "management" },
  { label: "Finance Accounts", path: "finance" },
  { label: "Marketing", path: "marketing" },
  { label: "Operations", path: "operations" },
  { label: "Personal & Admin", path: "admin" },
  { label: "Purchase & Logistics", path: "purchase" },
  { label: "IT", path: "it" },
  { label: "Legal", path: "legal" },
  { label: "HR", path: "hr" },
  { label: "Sales", path: "sales" },
  { label: "Academic Analytics", path: "analytics" },
];

const CampusFlowBottomNavTab = () => {
  return (
    <div className={styles.tabs}>
      {departments.map((dept) => (
        <NavLink
          key={dept.path}
          to={dept.path}   // 👈 RELATIVE PATH (subtab)
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.activeTab : ""}`
          }
        >
          {dept.label}
        </NavLink>
      ))}
    </div>
  );
};

export default CampusFlowBottomNavTab;
