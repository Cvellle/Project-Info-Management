import Note from 'features/notes/components/Note'
import { Flex, Image } from '@chakra-ui/react'
import noData from 'assets/no-results.png'

const CategoryNotes = ({ notes }) => {
  return (
    <>
      {notes.length ? (
        <Flex
          gap={{ base: '0.7rem', md: '1.5rem' }}
          flexWrap="wrap"
          marginTop="1.5rem"
          marginBottom="1.5rem">
          {notes?.map((note) => (
            <Note data={note} key={note.id} />
          ))}
        </Flex>
      ) : (
        <Image src={noData} m="auto" w={{ base: '80%', lg: '15vw' }} mt="20vh" d="block" />
      )}
    </>
  )
}

export default CategoryNotes
