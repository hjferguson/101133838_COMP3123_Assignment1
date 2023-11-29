import React, { useState, useEffect } from 'react';

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
    setSelectedEmployee(employee);
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
      <ul>
        {employees.data && employees.data.map(employee => (
          <li key={employee._id} onClick={() => handleEmployeeClick(employee)}>
            {employee.first_name} - {employee.last_name} - {employee.email} - {employee.gender} - ${employee.salary}
          </li>
        ))}
      </ul>
      
      <button onClick={() => setShowAddForm(true)}>Create New Employee</button>

      {showAddForm && (
        <form onSubmit={handleCreateNew}>
          <input
            name="first_name"
            value={newEmployee.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            name="last_name"
            value={newEmployee.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input 
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <select 
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
            name="salary"
            type="number"
            value={newEmployee.salary}
            onChange={handleInputChange}
            placeholder="Salary"
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Display selectedEmployee details */}
      {/* Show forms for create/update */}
      {/* Implement delete functionality */}
    </div>
  );
}

export default EmployeePage;
