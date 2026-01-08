import React from "react";
import Styles from "../CampusFlowMiddlePart/CampusFlowMiddle.module.css";
import EmployeeProfile from "../../../assets/campusFlowIcons/EmployeeDesignationProfile.svg";
import badge from "../../../assets/campusFlowIcons/BadgeIcon.svg";
import EmployeeDesignationCard from "widgets/EmployeeDesignationCard/EmployeeDesignationCard";

const CampusFlowMiddle = () => {
  return (
    <div className={Styles.CampusContainer}>
      <div className={Styles.heading}>Managed By</div>
      <div className={Styles.EmployeeCardContainer}>
        <EmployeeDesignationCard
          image={EmployeeProfile}
          employeeId="87918"
          name="Venkat Boppana"
          gender="Male"
          age={45}
          designation="Executive Dean"
          designationIcon={badge}
          onCall={() => console.log("Call clicked")}
          onMail={() => console.log("Mail clicked")}
        />
        <EmployeeDesignationCard
          image={EmployeeProfile}
          employeeId="87918"
          name="Venkat Boppana"
          gender="Male"
          age={45}
          designation="Principal"
          designationIcon={badge}

          subject="Maths 1A"
          onCall={() => console.log("Call")}
          onMail={() => console.log("Mail")}
        />
        <EmployeeDesignationCard
          image={EmployeeProfile}
          employeeId="87918"
          name="Venkat Boppana"
          gender="Male"
          age={45}
          designation="Executive Dean"
          designationIcon={badge}

          onCall={() => console.log("Call clicked")}
          onMail={() => console.log("Mail clicked")}
        />
        <EmployeeDesignationCard
          image={EmployeeProfile}
          employeeId="87918"
          name="Venkat Boppana"
          gender="Male"
          age={45}
          designation="Principal"
          designationIcon={badge}

          subject="Maths 1A"
          onCall={() => console.log("Call")}
          onMail={() => console.log("Mail")}
        />
        
      </div>
    </div>
  );
};

export default CampusFlowMiddle;
