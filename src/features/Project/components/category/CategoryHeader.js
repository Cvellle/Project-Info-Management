import React from 'react'
import { useDidUpdate } from 'hooks/useDidUpdate'
import { Input, Flex, InputGroup, InputLeftElement, Link, Button, Select } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'
import { Link as ReactLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { notesState, setFilterBy, setSortBy } from 'features/notes/notesSlice'

export function CategoryHeader() {
  // hooks
  const dispatch = useDispatch()
  // selectors
  const notesSelector = useSelector(notesState)
  //   const [menuVisible, setMenuVisible] = useState(false)
  // const [selected, setSelecetd] = useState('')

  // states
  const { filterBy, sortBy, notes } = notesSelector

  // spread store state with new value
  const addFilter = (e) => {
    const current = e.currentTarget
    let newFilter = current.value

    dispatch(
      setFilterBy({
        filterProp: current.name,
        filterBy: newFilter.toLowerCase()
      })
    )
  }
  // select input function - add value to filterBy store state
  const addSelectFilter = (e) => {
    const current = e.currentTarget
    let currentValue = JSON.parse(current.value)
    // let selectedBoolean = current.value.length > 0
    // setSelecetd(selectedBoolean)
    dispatch(
      setSortBy({
        sortKind: currentValue.kind,
        sortBy: currentValue.sortBy
      })
    )
  }

  // after filter is changed, change diltered array (in store state)
  useDidUpdate(() => {
    console.log(filterBy)
    //   dispatch()
  }, [filterBy])

  useDidUpdate(() => {
    console.log(notes)
    //   dispatch()
  }, [sortBy])

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
          onChange={(e) => addFilter(e)}
        />
      </InputGroup>

      <Select
        name="sort"
        autoComplete="current-role"
        defaultValue={''}
        onChange={(e) => addSelectFilter(e)}
        w="245px">
        <option value={JSON.stringify({ kind: 'desc', sortBy: 'createdAt' })}>
          {'Most recent'}
        </option>
        <option value={JSON.stringify({ kind: 'asc', sortBy: 'createdAt' })}>
          {'Least recent'}
        </option>
      </Select>

      <Link
        as={ReactLink}
        size="sm"
        to="add-note"
        _hover={{ textDecoration: 'none' }}
        ml={{ base: 'none', md: 'auto' }}>
        <Button colorScheme="teal" fontWeight="medium" size="sm">
          ADD NOTE
        </Button>
      </Link>
    </Flex>
  )
}
