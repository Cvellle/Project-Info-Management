import React, { useState, useEffect, useMemo } from 'react'
import { Input, Flex, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import { getNotesAsync } from 'features/notes/notesSlice'
import { selectedProject } from 'features/Project/projectSlice'
import { useDidUpdate } from 'hooks/useDidUpdate'

export function CategoryHeader({ category, valueChangeHandler }) {
  // hooks
  const dispatch = useDispatch()
  // local states
  const [name, setName] = useState('')
  const [sort, setSort] = useState('createdAt:desc')
  // selectors
  const project = useSelector(selectedProject)
  // handlers
  const handleChange = (event) => {
    setName(event.target.value)
  }
  const selectSort = (event) => setSort(event.target.value)

  // functions
  const filterResults = async () => {
    let notesResponse = await dispatch(
      getNotesAsync({ id: project?.id, name, sort: sort, category: category })
    )
    // two way binding - send results to upper component - CategoryTab
    notesResponse && valueChangeHandler(notesResponse.payload)
  }

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleChange, 300)
  }, [])

  // effects
  useEffect(() => {
    // filterResults()
  }, [])

  useDidUpdate(filterResults, [name, sort])

  return (
    <Flex
      justifyContent={{ base: 'center', md: 'flex-start' }}
      alignItems="center"
      gap="1rem"
      flexWrap="wrap">
      <InputGroup justifySelf="flex-end" width={{ base: '100%', md: '245px' }}>
        <InputLeftElement pointerEvents="none" height="100%">
          <DiReact color="var(--chakra-colors-cyan-400)" />
        </InputLeftElement>
        <Input
          placeholder="Search projects"
          size="sm"
          bgColor="#ffff"
          width="100%"
          height="48px"
          name="name"
          onChange={debouncedChangeHandler}
        />
      </InputGroup>

      <Select
        name="sort"
        autoComplete="current-role"
        defaultValue={''}
        width={{ base: '100%', md: '245px' }}
        height="48px"
        onChange={selectSort}
        cursor="pointer">
        <option value="createdAt:desc">{'Most recent'}</option>
        <option value="createdAt:asc">{'Least recent'}</option>
      </Select>
    </Flex>
  )
}
