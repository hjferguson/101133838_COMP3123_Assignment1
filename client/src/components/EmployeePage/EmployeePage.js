import React, { useState, useEffect } from 'react';
import './EmployeePage.css';

function EmployeePage() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  });
  const [showAddForm, setShowAddForm] = useState(false); // State to control the display of the add form
  const [isUpdating, setIsUpdating] = useState(false); //distinguish between add and update

  // Function to fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/emp/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: name === 'salary' ? Number(value) : value });
  };

  const handleEmployeeClick = (employee) => {
    console.log("Employee clicked:", employee);
    setSelectedEmployee(employee);
    setNewEmployee({  // This pre-fills the form with the employee's current details
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      salary: employee.salary
    });
  };
  

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`http://localhost:3000/api/v2/emp/employees/${selectedEmployee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEmployee)
      });
      if(response.ok){
        fetchEmployees();
        setIsUpdating(false);
        setSelectedEmployee(null);
      }else{
        console.error('Failed to update employee')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/v2/emp/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEmployee)
      });
      console.log(newEmployee)
      if (response.status === 201) {
        fetchEmployees(); // Re-fetch employees to update the list
      } else {
        console.error('Failed to create employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setNewEmployee({ first_name: '', last_name: '', email: '', gender: '', salary: 0 });
    setShowAddForm(false); // Hide form after submission
  };

  

  return (
    <div>
      <ul className="employee-list">
        {employees.data && employees.data.map(employee => (
          <li 
            key={employee._id} 
            className={`employee-list-item ${selectedEmployee && selectedEmployee._id === employee._id ? 'employee-selected' : ''}`}
          >
            {employee.first_name} - {employee.last_name} - {employee.email} - {employee.gender} - ${employee.salary}
            <div className="employee-buttons">
              <button onClick={(e) => {
                e.stopPropagation();
                handleEmployeeClick(employee);
                setIsUpdating(true);
              }}>Edit</button>
              <button onClick={(e) => {
                e.stopPropagation();
                // handleDelete logic here
              }}>Delete</button>
            </div>
          </li>
        ))}
    </ul>
      
      {isUpdating && selectedEmployee ? (
      <form onSubmit={handleUpdateEmployee}>
        <input
          className="form-input"
          name="first_name"
          value={newEmployee.first_name}  // Use newEmployee state
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          className="form-input"
          name="last_name"
          value={newEmployee.last_name}  // Use newEmployee state
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input 
          className="form-input"
          name="email"
          value={newEmployee.email}  // Use newEmployee state
          onChange={handleInputChange}
          placeholder="Email"
        />
        <select 
          className="form-input"
          name="gender"
          value={newEmployee.gender}  // Use newEmployee state
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input 
          className="form-input"
          name="salary"
          type="number"
          value={newEmployee.salary}  // Use newEmployee state
          onChange={handleInputChange}
          placeholder="Salary"
        />
        <button className="submit-button" type="submit">Update Employee</button>
      </form>
  ) : showAddForm && (
        // Form for adding a new employee
        <form onSubmit={handleCreateNew}>
          <input
            className="form-input"
            name="first_name"
            value={newEmployee.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            className="form-input"
            name="last_name"
            value={newEmployee.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input 
            className="form-input"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <select 
            className="form-input"
            name="gender"
            value={newEmployee.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input 
            className="form-input"
            name="salary"
            type="number"
            value={newEmployee.salary}
            onChange={handleInputChange}
            placeholder="Salary"
          />
          <button className="submit-button" type="submit">Add Employee</button>
        </form>
      )}
  
      <button onClick={() => {
        setShowAddForm(true);
        setIsUpdating(false);
        setSelectedEmployee(null);
        setNewEmployee({ first_name: '', last_name: '', email: '', gender: '', salary: 0 });
      }}>Create New Employee</button>
    </div>
  );
  
  
}
export default EmployeePage;