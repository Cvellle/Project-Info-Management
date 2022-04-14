import Note from 'features/notes/components/Note'
import { Flex } from '@chakra-ui/react'

const CategoryNotes = ({ notes }) => {
  return (
    <Flex
      gap={{ base: '0.7rem', md: '1.5rem' }}
      flexWrap="wrap"
      marginTop="1.5rem"
      marginBottom="1.5rem">
      {notes.map((note) => (
        <Note data={note} key={note.id} />
      ))}
    </Flex>
  )
}

export default CategoryNotes
