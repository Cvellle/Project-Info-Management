import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormInput from 'components/UI/FormInput'
import FileInput from 'components/UI/FileInput'
import FormTextarea from 'components/UI/FormTextarea'

export const CreateProject = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <>
      <PageDescription title="Create Project" text="Create a new project" image={rocket} />
      <Box
        bgColor="#F8F8F8"
        maxW="1280px"
        m={{ base: 'auto', md: '2rem auto' }}
        padding={{ base: '2rem 0.6rem', md: '3rem' }}
        borderRadius="0.4rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="flex-start" gap={{ base: '1rem', md: '4rem' }}>
            <Flex gap={{ base: '1rem', md: '5rem' }} flexDirection={{ base: 'column', md: 'row' }}>
              <Heading as="h3" fontSize={['lg', 'xl']}>
                Project Info
              </Heading>
              <Flex flexDirection="column" gap="2rem">
                <Flex
                  alignItems="flex-end"
                  gap="1rem"
                  flexDirection={{ base: 'column', md: 'row' }}>
                  <FormInput
                    label="Project Name"
                    name="name"
                    placeholder="Hello"
                    autoComplete="name"
                    register={register}
                    errors={errors}
                  />
                  <FileInput accept="image/*" name="logo" register={register} />
                </Flex>
                <FormTextarea
                  label="Project Description"
                  name="description"
                  placeholder="Hello"
                  register={register}
                  errors={errors}
                />
              </Flex>
            </Flex>
            <Flex gap="5rem">
              <Heading as="h3" fontSize={['lg', 'xl']}>
                Members
              </Heading>
              <Flex gap="1rem">
                <FormInput
                  name="employees"
                  register={register}
                  placeholder="Find employee"
                  errors={errors}
                />
                <Button type="button" variant="outline">
                  ADD
                </Button>
              </Flex>
            </Flex>

            <Button colorScheme="teal" isLoading={isSubmitting} type="submit" alignSelf="flex-end">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  )
}
