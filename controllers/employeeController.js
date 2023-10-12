const Employee = require('../models/employeeModel');

exports.getAllEmployees = async(req,res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json({
            status: true,
            data: employees
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Server error'
        });
    }
};

exports.getEmployeeById = async(req,res) => {
    try{
        const employeeId = req.params.eid;
        const existingEmployee = await Employee.findOne({ _id: employeeId }); //returns object for user document, or null
        if(!existingEmployee){
            return res.status(400).json({
                status: false,
                message: "Employee not found!"
            });
        }else{
            res.status(200).json({
                status: true,
                message: "Employee found!",
                existingEmployee
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Server error'
        });
    }
};

exports.createEmployee = async(req,res) => {
    try{
        let {first_name,last_name,email,gender,salary} = req.body;
        if(!first_name || !last_name || !email || !gender || !salary){
            return res.status(400).json({
                status: false,
                message: 'Missing required fields'
            });
        }

        gender = toLowerCase(gender);
        if(gender != 'male' && gender != 'female' && gender != 'other'){
            return res.status(400).json({
                status: false,
                message: 'Incorrect gender attribute. Must be: male, female, other'
            });
        }

        //want to make sure employee doesn't already exist
        const existingEmployee = await Employee.findOne({ email }); //returns object for user document, or null
        if(existingEmployee){
            return res.status(400).json({
                status: false,
                message: "Employee already exists!"
            });
        }

        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            salary
        });

        await newEmployee.save();
        res.status(201).json({
            status: true,
            message: 'Employee successfully created! :]'
        });


    }catch(error){
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Server error'
        });
    }
};

exports.updateEmployee = async(res,req) => {
    try{
        const employeeId = req.params.eid;
        const existingEmployee = await Employee.findOne({ _id: employeeId }); //returns object for user document, or null
        if(!existingEmployee){
            return res.status(400).json({
                status: false,
                message: "Employee not found!"
            });
        }else{
            let



            res.status(200).json({
                status: true,
                message: "Employee updated!",
                
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Server error'
        });
    }
};
