import {
  Button,
  Flex,
  Heading,
  VStack,
  Input,
  FormControl,
  FormErrorMessage,
  Text,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormInput from 'components/UI/FormInput'
import FileInput from 'components/UI/FileInput'
import FormTextarea from 'components/UI/FormTextarea'
import ProjectEmployee from './ProjectEmployee'
import { useSelector, useDispatch } from 'react-redux'
import { selectEmployees } from 'features/edit-user/usersSlice'
import { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsersAsync } from 'features/edit-user/usersSlice'
import { authState } from 'features/auth/authSlice'
import { method } from './method'
import { url } from 'shared/constants'
import useFormEmployees from 'hooks/useFormEmployees'
import { BiSearchAlt } from 'react-icons/bi'

const ProjectForm = ({ defValues, status, id }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [availableEmployees, setAvailableEmployees] = useState()
  const users = useSelector(selectEmployees)
  const [searchValueAvailable, setSearchValueAvailable] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState()
  const [availableFilteredEmployees, setAvailableFilteredEmployees] = useState()

  const { employees, setEmployees, addEmployee, removeEmployee, checkIfIsAlreadyAdded } =
    useFormEmployees()

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
    const id = setTimeout(() => {
      const fEmpl = employees.filter((employee) => employee.username.includes(searchValue))
      setFilteredEmployees(fEmpl)
    }, 300)

    return () => {
      clearTimeout(id)
    }
  }, [searchValue, employees])

  useEffect(() => {
    const id = setTimeout(() => {
      const fEmpl = availableEmployees?.filter((employee) =>
        employee.username.includes(searchValueAvailable)
      )
      setAvailableFilteredEmployees(fEmpl)
    }, 300)

    return () => {
      clearTimeout(id)
    }
  }, [searchValueAvailable, availableEmployees])

  useEffect(() => {
    const availableEmployees = users.filter((user) => !checkIfIsAlreadyAdded(user.id))
    setAvailableEmployees(availableEmployees)
  }, [users, employees])

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
        <Flex
          gap={{ base: '1rem', md: '5rem' }}
          flexDirection={{ base: 'column', md: 'row' }}
          width="100%">
          <Heading as="h3" fontSize={['lg', 'xl']} paddingRight={{ md: '1rem' }}>
            Members
          </Heading>
          <Flex columnGap="2.5rem" rowGap="1.8rem" flexDirection={{ base: 'column', md: 'row' }}>
            <VStack alignItems="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none" height="100%">
                  <BiSearchAlt color="#805ad5" />
                </InputLeftElement>
                <Input
                  bgColor="white"
                  placeholder="Added employees"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  minW="300px"
                />
              </InputGroup>
              <Flex
                flexDirection="column"
                gap="1.2rem"
                bgColor="white"
                p="0.8rem"
                borderRadius="0.4rem">
                {filteredEmployees?.length ? (
                  filteredEmployees.map((employee) => (
                    <ProjectEmployee
                      employee={employee}
                      id={employee.id}
                      name={employee.username}
                      key={employee.id}
                      src={`${url}${employee.userPhoto?.url}`}
                      removeEmployee={removeEmployee}
                      isAddDisabled={true}
                    />
                  ))
                ) : (
                  <Text margin="auto">No data</Text>
                )}
              </Flex>
            </VStack>
            <VStack alignItems="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none" height="100%">
                  <BiSearchAlt color="#805ad5" />
                </InputLeftElement>
                <Input
                  bgColor="white"
                  placeholder="Available employees"
                  value={searchValueAvailable}
                  onChange={(e) => setSearchValueAvailable(e.target.value)}
                  minW="300px"
                />
              </InputGroup>

              <Flex
                flexDirection="column"
                gap="1.2rem"
                bgColor="white"
                p="0.8rem"
                borderRadius="0.4rem">
                {availableFilteredEmployees?.length ? (
                  availableFilteredEmployees.map((user) => (
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
                  ))
                ) : (
                  <Text margin="auto">No data</Text>
                )}
              </Flex>
            </VStack>
          </Flex>
        </Flex>

        <Button
          colorScheme="purple"
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

export default memo(ProjectForm)
