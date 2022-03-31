import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PageDescription } from 'components/PageDescription'
import { getProjectAssync } from '../projectSlice'
import rocket from '../../../assets/rocket.png'
import { MdOpenInNew } from 'react-icons/md'

export function Project() {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getProjectAssync(params.id))
  }, [])

  return (
    <>
      <PageDescription
        title={
          <Flex gap="1rem">
            {`Test Projekat`}
            <Flex alignItems="center">
              <IconButton icon={<MdOpenInNew />} fontSize="md" bgColor="transparent" size="xs" />
              <Text color="gray.600" fontSize="sm">
                EDIT
              </Text>
            </Flex>
          </Flex>
        }
        text="Test Projekat Opis"
        image={rocket}></PageDescription>
      <Flex flexWrap="wrap" m="31px auto">
        s
      </Flex>
    </>
  )
}
