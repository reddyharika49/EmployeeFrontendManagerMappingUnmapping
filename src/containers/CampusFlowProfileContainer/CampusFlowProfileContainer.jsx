import CamnpusFlowImage from "../../components/CampusFlow/CampusFlowProfileComponent/CamnpusFlowImage";
import CampusFlowProfileLeft from "../../components/CampusFlow/CampusFlowProfileComponent/CampusFlowProfleLeft";
import styles from "./CampusFlowProfileContanier.module.css";

const CampusFlowProfileContainer = () => {
    return(
        <div className={styles.Campus_profile_container}>
            <CamnpusFlowImage/>
            <CampusFlowProfileLeft/>
        </div>
    );
}
export default CampusFlowProfileContainer;