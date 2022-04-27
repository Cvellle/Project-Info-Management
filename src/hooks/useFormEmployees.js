import { useState } from 'react'

const useFormEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [isFiltering, setIsFiltering] = useState()
  const [filteredEmployees, setFilteredEmployees] = useState([])

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

  const filterEmployees = (e) => {
    if (e.target.value.length > 0) {
      setIsFiltering(true)
    } else if (isFiltering === true && e.target.value.length <= 0) {
      setIsFiltering(false)
    }
    const filteredEmployeesNew = employees.filter((emp) => emp.username.includes(e.target.value))
    setFilteredEmployees(filteredEmployeesNew)
  }

  return {
    employees,
    setEmployees,
    addEmployee,
    removeEmployee,
    filterEmployees,
    filteredEmployees,
    checkIfIsAlreadyAdded,
    isFiltering
  }
}

export default useFormEmployees
