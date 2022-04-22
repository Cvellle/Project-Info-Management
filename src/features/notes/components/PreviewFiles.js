import { Text } from '@chakra-ui/react'

const PreviewFiles = ({ files }) => {
  console.log(files)
  const filesArr = Object.values(files)
  return filesArr.map((file) => (
    <Text
      key={file.name}
      gap="0.5rem"
      alignItems="center"
      bgColor="#ede7fd"
      width="fit-content"
      padding="0.1rem 0.5rem"
      marginBottom="0.5rem"
      borderRadius="0.2rem">
      {file.name}
    </Text>
  ))
}

export default PreviewFiles
