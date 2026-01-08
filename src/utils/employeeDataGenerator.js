// Employee data generator utility
export const generateEmployee = (index) => {
  const names = ['Devansh.N', 'Priya Sharma', 'Raj Kumar', 'Anita Patel', 'Suresh Reddy', 'Meera Singh'];
  const departments = ['IT Cell', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
  const reportingManagers = ['Vamsi Ramana', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma', 'Lakshmi Nair'];
  const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];
  const projects = ['IPL', 'CRM', 'ERP', 'Analytics', 'Mobile App', 'Web Portal'];
  const levels = ['Level 4', 'Level 3', 'Level 5', 'Level 2', 'Level 4', 'Level 3'];
  const types = ['Permanent', 'Contract', 'Permanent', 'Intern', 'Permanent', 'Contract'];
  
  const i = index % names.length;
  return {
    id: `HYD ${String(5627182 + index).padStart(7, '0')}`,
    name: names[i],
    department: departments[i],
    level: levels[i],
    type: types[i],
    campus: {
      name: 'Name Of The Campus',
      address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
    },
    reportingManager: reportingManagers[i] || 'Vamsi Ramana',
    manager: managers[i],
    project: projects[i]
  };
};

