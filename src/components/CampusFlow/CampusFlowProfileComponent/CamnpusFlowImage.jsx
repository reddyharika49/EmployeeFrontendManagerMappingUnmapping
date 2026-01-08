import React from "react";
import styles from "../../CampusFlow/CampusFlowProfileComponent/CampusFlowHeader.module.css";
import phoneIcon from "assets/EmployeeProfileCrad/phoneIcon.svg";
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
import dotsIcon from "assets/EmployeeProfileCrad/dotsicon.svg";
import mailIconOutline from "assets/RightSideInformation Icons/MailIconOutLine.svg";
import CampusImage from "../../../assets/campusFlowIcons/CampusImage.svg";

import {

    Tooltip,
} from "@mui/material";
import gendericon from "assets/EmployeeProfileCrad/Gendericon.svg";
const CamnpusFlowImage = () => {
    const phoneNumber = "9703180399";
    const email = "suresh@gmail.com";
    return (
        <div className={styles.employeeprofileContainer}>

            <figure className={styles.employeeProfile}>
                <img className={styles.emp_img}
                    src={CampusImage}
                />
            </figure>

            <div className={styles.infoSection}>
                <p className={styles.empId}>Campus Code:<br /><span>87918</span></p>
                <h3 className={styles.name}>Hydernagar_Girls_Residential</h3>

                <div className={styles.details}>
                    <span className={styles.detail}>
                        <img src={gendericon} alt="Gender icon" className={styles.icon} /> co-education
                    </span>
                    <span className={styles.detail}>• Residential</span>
                </div>
                <div>
                    <p className={styles.location}>
                        Infinity Towers, Plot No 2-91/31, Near N <br></br>Convention Road, HITEC City, Hyderabad, <br></br>Telangana 500081
                    </p>
                </div>

                <div className={styles.actions}>
                    <button className={styles.designation}>Icon,Ipl</button>
                    {/* <img src={phoneIcon}  />
            <img src={dotsIcon} /> */}
                    <Tooltip
                        title={
                            phoneNumber ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <img
                                        src={callIconOutLine}
                                        alt="Phone"
                                        style={{ width: "14px", height: "14px" }}
                                    />
                                    <span>{phoneNumber}</span>
                                </div>
                            ) : (
                                "No number available"
                            )
                        }
                        arrow
                        placement="top"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: "#fff",
                                    color: "#3425FF",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #3425FF",
                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                                },
                            },
                            arrow: {
                                sx: {
                                    color: "#FFF", // arrow color same as tooltip background
                                    "&::before": {
                                        border: "1px solid #3425FF", // ✅ optional: add border around arrow
                                    },
                                },
                            },
                        }}
                    >
                        <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                            <img
                                src={phoneIcon}
                                alt="Call"
                            // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                            />
                        </figure>
                    </Tooltip>

                    <Tooltip
                        title={
                            phoneNumber ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <img
                                        src={mailIconOutline}
                                        alt="Phone"
                                        style={{ width: "14px", height: "14px" }}
                                    />
                                    <span>{email}</span>
                                </div>
                            ) : (
                                "No number available"
                            )
                        }
                        arrow
                        placement="top"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: "#fff",
                                    color: "#3425FF",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #3425FF",
                                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                                },
                            },
                            arrow: {
                                sx: {
                                    color: "#FFF", // arrow color same as tooltip background
                                    "&::before": {
                                        border: "1px solid #3425FF", // ✅ optional: add border around arrow
                                    },
                                },
                            },
                        }}
                    >
                        <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                            <img
                                src={dotsIcon}
                                alt="mail"
                            // onClick={() => phoneNumber && window.open(`tel:${phoneNumber}`)}
                            />
                        </figure>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default CamnpusFlowImage;