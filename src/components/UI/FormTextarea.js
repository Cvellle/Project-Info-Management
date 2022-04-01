import { FormControl, FormLabel, Textarea, FormErrorMessage } from '@chakra-ui/react'

const FormTextarea = ({ name, label, placeholder, autoComplete, register, errors }) => {
  return (
    <FormControl isInvalid={errors.name} isRequired>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Textarea
        bgColor="white"
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, {
          required: 'This is required'
        })}
      />
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>
  )
}

export default FormTextarea
