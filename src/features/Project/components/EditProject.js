import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import ProjectForm from './ProjectForm'
import { Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectAsync } from '../projectSlice'
import { useEffect, useState } from 'react'
import { selectedProject } from '../projectSlice'
import { useParams } from 'react-router-dom'

const EditProject = () => {
  const dispatch = useDispatch()
  const project = useSelector(selectedProject)
  const { id } = useParams()
  const [defaultValues, setDefaultValues] = useState({})

  useEffect(() => {
    dispatch(getProjectAsync(id))
  }, [])

  useEffect(() => {
    if (project) {
      const defValues = {
        name: project.attributes.name,
        description: project.attributes.description,
        currentEmployees: project.attributes.employees.data.map((employee) => {
          return {
            id: employee.id,
            username: employee.attributes.username,
            userPhoto: employee.attributes.userPhoto.data?.attributes
          }
        })
      }
      setDefaultValues(defValues)
    }
  }, [project])

  return (
    <>
      <PageDescription title="Edit Project" text="Update project info" image={rocket} />
      <Box
        bgColor="#F8F8F8"
        maxW="1280px"
        m={{ base: 'auto', md: '2rem auto' }}
        padding={{ base: '2rem 0.6rem', md: '3rem' }}
        borderRadius="0.4rem">
        <ProjectForm defValues={defaultValues} status="update" id={id} />
      </Box>
    </>
  )
}

export default EditProject
