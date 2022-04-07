import { Avatar, Flex, Heading, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { GrAddCircle } from 'react-icons/gr'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const ProjectEmployee = ({
  id,
  src,
  name,
  addEmployee,
  removeEmployee,
  employee,
  isAddDisabled
}) => {
  const [isAdded, setIsAdded] = useState(isAddDisabled ? true : false)

  const handlerClick = () => {
    isAdded ? removeEmployee(id) : addEmployee(employee)
    setIsAdded((prev) => !prev)
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center" gap="1rem">
        <Avatar name={name} src={src} />
        <Heading as="h4" fontSize="md">
          {name}
        </Heading>
      </Flex>

      <IconButton
        aria-label="Add employee"
        icon={isAdded ? <AiOutlineCloseCircle /> : <GrAddCircle />}
        onClick={handlerClick}
      />
    </Flex>
  )
}

export default ProjectEmployee
