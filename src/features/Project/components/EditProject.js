import { PageDescription } from 'components/PageDescription'
import ProjectForm from './ProjectForm'
import { Box, Spinner, Center } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProjectAsync, projectState } from '../projectSlice'
import { useParams } from 'react-router-dom'
import { url } from 'shared/constants'

const EditProject = () => {
  const dispatch = useDispatch()
  const projectSelector = useSelector(projectState)
  const { selectedProject, loading } = projectSelector
  const { id } = useParams()
  const [defaultValues, setDefaultValues] = useState({})

  useEffect(() => {
    dispatch(getProjectAsync(id))
  }, [])

  useEffect(() => {
    if (selectedProject) {
      const defValues = {
        name: selectedProject?.attributes.name,
        description: selectedProject?.attributes.description,
        currentEmployees: selectedProject?.attributes.employees.data.map((employee) => {
          return {
            id: employee.id,
            username: employee.attributes.username,
            userPhoto: employee.attributes.userPhoto.data?.attributes
          }
        })
      }
      setDefaultValues(defValues)
    }
  }, [selectedProject])

  return (
    <>
      {!loading ? (
        <Box>
          <PageDescription
            title="Edit Project"
            text="Update project info"
            image={`${url}${selectedProject?.attributes?.logo?.data?.attributes?.url}`}
          />
          <Box
            bgColor="#F8F8F8"
            maxW="1280px"
            m={{ base: 'auto', md: '2rem auto' }}
            padding={{ base: '2rem 0.6rem', md: '3rem' }}
            borderRadius="0.4rem">
            <ProjectForm defValues={defaultValues} status="update" id={id} />
          </Box>
        </Box>
      ) : (
        <Center h="70vh">
          <Spinner />
        </Center>
      )}
    </>
  )
}

export default EditProject
