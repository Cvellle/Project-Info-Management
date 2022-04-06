import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import { Box, Button, Flex, Heading, VStack, useDisclosure, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormInput from 'components/UI/FormInput'
import FileInput from 'components/UI/FileInput'
import FormTextarea from 'components/UI/FormTextarea'
import { ModalComponent } from 'components/UI/ModalComponent'
import ProjectEmployee from './ProjectEmployee'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers } from 'features/edit-user/usersSlice'
import { uploadLogo } from '../api/uploadLogo'
import { useState, useEffect } from 'react'
import { createProject } from '../api/createProjectAPI'
import { useNavigate } from 'react-router-dom'
import { getUsersAsync } from 'features/edit-user/usersSlice'

export const CreateProject = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [employees, setEmployees] = useState([])
  const [isFiltering, setIsFiltering] = useState()
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersAsync())
  }, [])

  const { users } = useSelector(selectUsers)

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
      const logoId = await uploadLogo(data.logo[0])
      const modifiedEmployees = employees.map((employee) => ({ id: employee.id }))
      await createProject({ ...data, logo: logoId, employees: modifiedEmployees })
      navigate('/')
    } catch (ex) {
      console.log(ex)
    }
  }
  return (
    <>
      <PageDescription title="Create Project" text="Create a new project" image={rocket} />
      <Box
        bgColor="#F8F8F8"
        maxW="1280px"
        m={{ base: 'auto', md: '2rem auto' }}
        padding={{ base: '2rem 0.6rem', md: '3rem' }}
        borderRadius="0.4rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="flex-start" gap={{ base: '1rem', md: '4rem' }}>
            <Flex gap={{ base: '1rem', md: '5rem' }} flexDirection={{ base: 'column', md: 'row' }}>
              <Heading as="h3" fontSize={['lg', 'xl']}>
                Project Info
              </Heading>
              <Flex flexDirection="column" gap="2rem">
                <Flex
                  alignItems="flex-end"
                  gap="1rem"
                  flexDirection={{ base: 'column', md: 'row' }}>
                  <FormInput
                    label="Project Name"
                    name="name"
                    placeholder="Hello"
                    autoComplete="name"
                    register={register}
                    errors={errors}
                  />
                  <FileInput accept="image/*" name="logo" register={register} requiredProp={true} />
                </Flex>
                <FormTextarea
                  label="Project Description"
                  name="description"
                  placeholder="Hello"
                  register={register}
                  errors={errors}
                />
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
                  const user = users.find((user) => user.id === employee.id)
                  return (
                    <ProjectEmployee
                      user={user}
                      id={user.id}
                      name={user.username}
                      key={user.id}
                      src="https://projets-info-backend.herokuapp.com/uploads/356_3562377_personal_user_2f0fd4ecaa.png"
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
                        user={user}
                        id={user.id}
                        name={user.username}
                        key={user.id}
                        src="https://projets-info-backend.herokuapp.com/uploads/356_3562377_personal_user_2f0fd4ecaa.png"
                        addEmployee={addEmployee}
                        removeEmployee={removeEmployee}
                        isAddDisabled={false}
                      />
                    ))}
                  </Flex>
                </ModalComponent>
              </Flex>
            </Flex>

            <Button colorScheme="teal" isLoading={isSubmitting} type="submit" alignSelf="flex-end">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  )
}
