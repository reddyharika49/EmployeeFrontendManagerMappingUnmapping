import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import MainContentGrid from '../../components/ManagerMappingAndUnmappingComponents/Remapping/MainContentGrid';
import UnmappingContentGrid from '../../components/ManagerMappingAndUnmappingComponents/Unmapping/UnmappingContentGrid';

const Layout = () => {
  const location = useLocation();
  // Check if we're coming from unassign-individual route
  const isUnassignRoute = location.pathname.includes('unassign-individual');
  const defaultRoute = isUnassignRoute ? 'unmapping' : 'remapping';
  
  // Get selected employees from location state
  const selectedEmployees = location.state?.selectedEmployees || [];

  // Debug: Log to see if employees are being received
  console.log('Layout - selectedEmployees:', selectedEmployees);
  console.log('Layout - selectedEmployees length:', selectedEmployees.length);

  return (
    <div className={styles.layoutContainer}>
      <main className={styles.layoutMain}>
        <Routes>
          <Route path="remapping" element={<MainContentGrid initialEmployees={selectedEmployees} />} />
          <Route path="unmapping" element={<UnmappingContentGrid initialEmployees={selectedEmployees} />} />
          <Route path="/" element={<Navigate to={defaultRoute} replace state={location.state} />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;

