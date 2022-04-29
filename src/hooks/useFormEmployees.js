import { useState } from 'react'

const useFormEmployees = () => {
  const [employees, setEmployees] = useState([])

  const addEmployee = (employee) => {
    const employeesNew = [...employees, employee]
    setEmployees(employeesNew)
  }

  const removeEmployee = (id) => {
    const employeesNew = employees.filter((emp) => emp.id !== id)
    setEmployees(employeesNew)
  }

  const checkIfIsAlreadyAdded = (id) => {
    return employees.find((employee) => employee.id === id)
  }

  return {
    employees,
    setEmployees,
    addEmployee,
    removeEmployee,
    checkIfIsAlreadyAdded
  }
}

export default useFormEmployees
