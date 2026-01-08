import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CampusFlowPopup.module.css";
import backArrow from "../../assets/campusFlowIcons/BackArrow.svg";
import Dropdown from "../../widgets/Dropdown/Dropdown";
import Button from "widgets/Button/Button";
import rightarrow from "assets/managermappingsearch/rightarrow";

import { campusFlowApi } from "../../api/campusflow/campusflow";

const CampusFlowPopup = () => {
  const navigate = useNavigate();

  // -------------------- STATE --------------------
  const [cities, setCities] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [campuses, setCampuses] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const [selectedBusinessTypeName, setSelectedBusinessTypeName] = useState("");
  const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState(null);

  const [selectedCampus, setSelectedCampus] = useState("");

  // -------------------- FETCH LOCATIONS --------------------
  useEffect(() => {
    campusFlowApi
      .getCities()
      .then((res) => {
        console.log("✅ Cities:", res.data);
        setCities(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Cities API error");
        setCities([]);
      });
  }, []);

  // -------------------- FETCH BUSINESS TYPES --------------------
  useEffect(() => {
    campusFlowApi
      .getAllBusinessTypes()
      .then((res) => {
        console.log("✅ Business Types:", res.data);
        setBusinessTypes(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Business Types API error");
        setBusinessTypes([]);
      });
  }, []);

  // -------------------- FETCH CAMPUSES --------------------
  useEffect(() => {
    if (!selectedLocationId || !selectedBusinessTypeId) return;

    campusFlowApi
      .getCampuses(selectedLocationId, selectedBusinessTypeId)
      .then((res) => {
        console.log("✅ Campuses:", res.data);
        setCampuses(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Campuses API error");
        setCampuses([]);
      });
  }, [selectedLocationId, selectedBusinessTypeId]);

  // -------------------- HANDLERS --------------------
  const handleLocationChange = (e) => {
    const cityName = e.target.value;
    const city = cities.find((c) => c.name === cityName);

    console.log("📍 Selected City:", cityName, "ID:", city?.id);

    setSelectedLocation(cityName);
    setSelectedLocationId(city ? city.id : null);

    setSelectedBusinessTypeName("");
    setSelectedBusinessTypeId(null);
    setSelectedCampus("");
    setCampuses([]);
  };

  const handleBusinessTypeChange = (e) => {
    const name = e.target.value;
    const bt = businessTypes.find(
      (b) => b.businessTypeName === name
    );

    console.log("🏢 Selected Business Type:", name, "ID:", bt?.businessTypeId);

    setSelectedBusinessTypeName(name);
    setSelectedBusinessTypeId(bt ? bt.businessTypeId : null);
    setSelectedCampus("");
    setCampuses([]);
  };

  const handleCampusChange = (e) => {
    console.log("🏫 Selected Campus:", e.target.value);
    setSelectedCampus(e.target.value);
  };

  const handleCheckEmployees = () => {
    console.log("➡️ Navigating with:", {
      cityId: selectedLocationId,
      businessTypeId: selectedBusinessTypeId,
      campus: selectedCampus,
    });

    navigate("/scopes/employee/campus-flow-popup/campusflowpage", {
      state: {
        cityId: selectedLocationId,
        businessTypeId: selectedBusinessTypeId,
        campus: selectedCampus,
      },
    });
  };

  // -------------------- UI --------------------
  return (
    <div className={styles.popupContainer}>
      {/* Header */}
      <div className={styles.header}>
        <img
          src={backArrow}
          alt="Back"
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />
        <h2 className={styles.title}>Campus Flow</h2>
      </div>

      {/* Body */}
      <div className={styles.content}>
        {/* Location */}
        <Dropdown
          dropdownname="Location"
          name="Location"
          results={cities.map((c) => c.name)}
          value={selectedLocation}
          onChange={handleLocationChange}
        />

        {/* Business Type */}
        <Dropdown
          dropdownname="Business Type"
          name="Business Type"
          results={businessTypes.map((bt) => bt.businessTypeName)}
          value={selectedBusinessTypeName}
          onChange={handleBusinessTypeChange}
          disabled={!selectedLocation}
        />

        {/* Campus */}
        <Dropdown
          dropdownname="Campus"
          name="Campus"
          results={campuses.map(
            (c) => c.name || c.campusName || ""
          )}
          value={selectedCampus}
          onChange={handleCampusChange}
          disabled={!selectedBusinessTypeId}
        />

        {/* Button */}
        <div className={styles.buttonContainer}>
          <Button
            buttonname="Check Employees"
            righticon={rightarrow}
            onClick={handleCheckEmployees}
            variant="primary"
            width="199px"
            // disabled={
            //   !selectedLocationId ||
            //   !selectedBusinessTypeId ||
            //   !selectedCampus
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default CampusFlowPopup;
