import Styles from "../CampusFlowContainer/CampusFlowContainer.module.css";
import CampusFlowProfileContainer from "../CampusFlowProfileContainer/CampusFlowProfileContainer";
import CampusFlowMiddle from "../../components/CampusFlow/CampusFlowMiddlePart/CampusFlowMiddle";
// import CampusFlowBottom from "../../components/CampusFlow/CampusFlowBottomPart/CampusFlowBottom";
import { Outlet } from "react-router-dom";
import CampusFlowBottomNavTab from "../../components/CampusFlow/CampusFlowBottomPart/CampusFlowBottomNavTab";

const CampusFlowContainer = () => {
  return (
    <div className={Styles.CampusFlowContainer}>
      {/* FIXED SECTIONS */}
      <CampusFlowProfileContainer />
      <CampusFlowMiddle />

      {/* SUB-TABS */}
      <CampusFlowBottomNavTab/>

      {/* 🔥 ONLY THIS AREA CHANGES */}
      <div className={Styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
};
export default CampusFlowContainer;