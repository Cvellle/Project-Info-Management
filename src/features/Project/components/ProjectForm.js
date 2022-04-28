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
import { url } from 'shared/constants'
import useFormEmployees from 'hooks/useFormEmployees'

const ProjectForm = ({ defValues, status, id }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalEmployees, setModalEmployees] = useState()
  const [employeesToFilter, setEmployeesToFilter] = useState()
  const [modalEmployeesFilter, setModalEmployeesFilter] = useState(false)
  const users = useSelector(selectEmployees)

  const {
    employees,
    setEmployees,
    addEmployee,
    removeEmployee,
    filterEmployees,
    filteredEmployees,
    checkIfIsAlreadyAdded,
    isFiltering
  } = useFormEmployees()

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

  useEffect(() => {
    if (!modalEmployeesFilter) {
      const availableEmployees = users.filter((user) => !checkIfIsAlreadyAdded(user.id))
      setModalEmployees(availableEmployees)
      setEmployeesToFilter(availableEmployees)
    }
  }, [users, modalEmployeesFilter, employees])

  const filterModalEmployees = (e) => {
    const employeesFiltered = employeesToFilter.filter((employee) => {
      if (!employee.username.includes(e.target.value)) {
        return false
      }
      return true
    })

    setModalEmployees(employeesFiltered)
    if (e.target.value.length > 0) {
      setModalEmployeesFilter(true)
    } else if (modalEmployeesFilter === true && e.target.value.length <= 0) {
      setModalEmployeesFilter(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      let res = await method({ status, employees, currentUser, data, id })
      res && !res.error && navigate(-1)
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
              <VStack gap="1rem" alignItems="stretch">
                <Input
                  bgColor="white"
                  placeholder="Find available employees"
                  onChange={filterModalEmployees}
                />
                <Flex flexDirection="column" gap="2rem">
                  {modalEmployees &&
                    modalEmployees.map((user) => (
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
              </VStack>
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
