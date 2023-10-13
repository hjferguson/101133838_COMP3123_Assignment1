const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const checkAuth = require('../middleware/authMiddleware');

//da routes (ezmode because I followed MVC design principles!!!!)
router.get('/api/v1/emp/employees', employeeController.getAllEmployees);
router.post('/api/v1/emp/employees', checkAuth, employeeController.createEmployee);
router.get('/api/v1/emp/employees/:eid', employeeController.getEmployeeById);
router.put('/api/v1/emp/employees/:eid', checkAuth, employeeController.updateEmployee);
router.delete('/api/v1/emp/employees', checkAuth, employeeController.deleteEmployee);

module.exports = router;