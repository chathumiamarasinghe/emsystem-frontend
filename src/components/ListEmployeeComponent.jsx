import React, {useState} from 'react'
import { useEffect } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([]) 

   const navigator = useNavigate();

   useEffect(() => {
      getAllEmployee();
   }, [])
   
   function getAllEmployee(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error(error);
    })
   }

   function addNewEmployee(){
    navigator('/add-employee');
   }

   function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
   }

   function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((response) => {
        getAllEmployee();
    }).catch(error => {
        console.error(error);
    })
   }

  return (
    
    <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-6">
                    <h2 className="fw-bold text-primary">Employee Management System</h2>
                </div>
                <div className="col-md-6 text-end">
                    <button className="btn btn-success btn-lg" onClick={addNewEmployee}>
                    Add Employee
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => updateEmployee(employee.id)}
                                        > Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeEmployee(employee.id)}
                                        > Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        
  )
}

export default ListEmployeeComponent