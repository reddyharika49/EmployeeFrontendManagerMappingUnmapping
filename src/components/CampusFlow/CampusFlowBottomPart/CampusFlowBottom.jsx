import CampusFlowBottomNavTab from "./CampusFlowBottomNavTab";
import styles from "../CampusFlowBottomPart/CampusFlowBottom.module.css";
import CampusFlowBioDataCard from "./CampusFlowEmpDetailscards";


const CampusFlowBottm = () => {
    return(
        <div className={styles.CampusFlowBottm}>
            <CampusFlowBottomNavTab/>

            <CampusFlowBioDataCard/>
        </div>
    );
};
export default CampusFlowBottm;