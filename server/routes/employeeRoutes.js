const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const checkAuth = require('../middleware/authMiddleware');

//da routes (ezmode because I followed MVC design principles!!!!)
router.get('/api/v2/emp/employees', employeeController.getAllEmployees);
router.post('/api/v2/emp/employees', employeeController.createEmployee);
router.get('/api/v2/emp/employees/:eid', employeeController.getEmployeeById);
router.put('/api/v2/emp/employees/:eid', checkAuth, employeeController.updateEmployee);
router.delete('/api/v2/emp/employees', checkAuth, employeeController.deleteEmployee);
router.get('/api/v2/employees/statistics', employeeController.getStatistics);

module.exports = router;