import React, { useState, useEffect } from 'react'
import { Input, Flex, InputGroup, InputLeftElement, Link, Button, Select } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'
import { Link as ReactLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesAsync } from 'features/notes/notesSlice'
import { selectedProject } from 'features/Project/projectSlice'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'

export function CategoryHeader({ category, valueChangeHandler }) {
  //hooks
  const dispatch = useDispatch()
  // local states
  const [name, setName] = useState('')
  const [sort, setSort] = useState('createdAt:desc')
  // selectors
  const project = useSelector(selectedProject)
  const authSelector = useSelector(authState)
  // redux states
  const { currentUser } = authSelector
  // handlers
  const handleChange = (event) => setName(event.target.value)
  const selectSort = (event) => setSort(event.target.value)

  const filterResults = async () => {
    let notesResponse = await dispatch(
      getNotesAsync({ id: project.id, name, sort: sort, category })
    )
    // two way binding - send results to upper component - CategoryTab
    valueChangeHandler(notesResponse.payload)
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      filterResults()
    }, 500)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [name, project, sort])

  return (
    <Flex justifyContent={{ base: 'center', md: 'flex-start' }} alignItems="center" gap="1rem">
      <InputGroup justifySelf="flex-end" width={{ base: '80%', md: '245px' }}>
        <InputLeftElement pointerEvents="none" height="100%">
          <DiReact color="var(--chakra-colors-cyan-400)" />
        </InputLeftElement>
        <Input
          placeholder="Search projects"
          size="sm"
          bgColor="#ffff"
          width="100%"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </InputGroup>

      <Select
        name="sort"
        autoComplete="current-role"
        defaultValue={''}
        w="245px"
        onChange={selectSort}>
        <option value="createdAt:desc">{'Most recent'}</option>
        <option value="createdAt:asc">{'Least recent'}</option>
      </Select>

      <Link
        as={ReactLink}
        size="sm"
        to="add-note"
        _hover={{ textDecoration: 'none' }}
        ml={{ base: 'none', md: 'auto' }}>
        {currentUser?.role === projectManager && (
          <Button colorScheme="teal" fontWeight="medium" size="sm">
            ADD NOTE
          </Button>
        )}
      </Link>
    </Flex>
  )
}
