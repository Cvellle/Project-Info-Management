import { Flex } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItems, selectProjects } from '../dashboardSlice'
import { ProjectItem } from './ProjectItem'

export function Projects() {
  const dispatch = useDispatch()
  const projectsSelector = useSelector(selectProjects)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <Flex flexWrap="wrap" w="calc(1222px + 15px)" m="31px auto">
      {projectsSelector.map((project, i) => {
        let projectAttributes = project.attributes
        return (
          <ProjectItem
            key={i}
            projectTitle={projectAttributes.name}
            projectImg={projectAttributes.logo.data.attributes.url}
            projectDescription={projectAttributes.description}
          />
        )
      })}
    </Flex>
  )
}
