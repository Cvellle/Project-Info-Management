import {
  Button,
  Flex,
  Heading,
  VStack,
  useDisclosure,
  Input,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormInput from 'components/UI/FormInput'
import FileInput from 'components/UI/FileInput'
import FormTextarea from 'components/UI/FormTextarea'
import { ModalComponent } from 'components/UI/ModalComponent'
import ProjectEmployee from './ProjectEmployee'
import { useSelector, useDispatch } from 'react-redux'
import { selectEmployees } from 'features/edit-user/usersSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsersAsync } from 'features/edit-user/usersSlice'
import { authState } from 'features/auth/authSlice'
import { method } from './method'

const ProjectForm = ({ defValues, status, id }) => {
  const url = process.env.REACT_APP_BACKEND_URL

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [employees, setEmployees] = useState([])
  const [isFiltering, setIsFiltering] = useState()
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const navigate = useNavigate()
  const { currentUser } = useSelector(authState)
  useEffect(() => {
    if (defValues?.currentEmployees) {
      setEmployees(defValues.currentEmployees)
    }
    reset({ name: defValues?.name, description: defValues?.description })
  }, [defValues])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersAsync())
  }, [])

  const checkIfIsAlreadyAdded = (id) => {
    return employees.find((employee) => employee.id === id)
  }

  const users = useSelector(selectEmployees).filter((user) => !checkIfIsAlreadyAdded(user.id))

  const addEmployee = (employee) => {
    const employeesNew = [...employees, employee]
    setEmployees(employeesNew)
  }

  const removeEmployee = (id) => {
    const employeesNew = employees.filter((emp) => emp.id !== id)
    setEmployees(employeesNew)
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

  const onSubmit = async (data) => {
    try {
      let res = await method({ status, employees, currentUser, data, id })
      res && !res.error && navigate(`/project/${id}`)
    } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="flex-start" gap={{ base: '1rem', md: '4rem' }}>
        <Flex
          gap={{ base: '1rem', md: '5rem' }}
          flexDirection={{ base: 'column', md: 'row' }}
          width={{ base: '98%', md: 'unset' }}
          m={{ base: 'auto', md: 'unset' }}>
          <Heading as="h3" fontSize={['lg', 'xl']}>
            Project Info
          </Heading>
          <Flex flexDirection="column" gap="2rem" position="relative">
            <Flex alignItems="flex-end" gap="1rem" flexDirection={{ base: 'column', md: 'row' }}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormInput
                  label="Project Name"
                  name="name"
                  placeholder="Hello"
                  autoComplete="name"
                  register={register}
                  defaultValue={defValues?.name}
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <Flex
                style={{ transform: `translate(${0}px, ${42}px)` }}
                borderRadius="15px"
                mr={{ base: 'auto', md: 'unset' }}>
                <FileInput
                  accept="image/*"
                  name="logo"
                  register={register}
                  requiredProp={false}
                  labelText="Choose Project Logo"
                  id="project-logo"
                  fontSize="16px"
                  widthProp="200px"
                  position="absolute"
                  right="0"
                  height="48px"
                />
              </Flex>
            </Flex>
            <FormControl isInvalid={errors.description} isRequired>
              <FormTextarea
                label="Project Description"
                name="description"
                placeholder="Hello"
                register={register}
                defaultValue={defValues?.description}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </Flex>
        <Flex gap={{ base: '1rem', md: '5rem' }} flexDirection={{ base: 'column', md: 'row' }}>
          <Heading as="h3" fontSize={['lg', 'xl']} paddingRight={{ md: '1rem' }}>
            Members
          </Heading>
          <Flex gap="1rem" flexDirection="column">
            <Flex gap="1rem">
              <Input bgColor="white" placeholder="Find employee" onChange={filterEmployees} />
              <Button type="button" variant="outline" onClick={onOpen}>
                ADD
              </Button>
            </Flex>

            {(isFiltering ? filteredEmployees : employees).map((employee) => {
              return (
                <ProjectEmployee
                  employee={employee}
                  id={employee.id}
                  name={employee.username}
                  key={employee.id}
                  src={`${url}${employee.userPhoto?.url}`}
                  removeEmployee={removeEmployee}
                  isAddDisabled={true}
                />
              )
            })}
            <ModalComponent
              isOpen={isOpen}
              onClose={onClose}
              title="Add Employee"
              confirmText="Save"
              action={onClose}>
              <Flex flexDirection="column" gap="2rem">
                {users.map((user) => (
                  <ProjectEmployee
                    employee={user}
                    id={user.id}
                    name={user.username}
                    key={user.id}
                    src={`${url}${user.userPhoto?.url}`}
                    addEmployee={addEmployee}
                    removeEmployee={removeEmployee}
                    isAddDisabled={false}
                  />
                ))}
              </Flex>
            </ModalComponent>
          </Flex>
        </Flex>

        <Button
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          alignSelf="flex-end"
          width={{ base: '100%', md: 'unset' }}
          mb="100px">
          Submit
        </Button>
      </VStack>
    </form>
  )
}

export default ProjectForm
