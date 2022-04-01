import React from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'

const FormInput = ({ name, label, placeholder, autoComplete, register, errors }) => {
  return (
    <FormControl isInvalid={errors.name} isRequired>
      {label && <FormLabel htmlFor="name">{label}</FormLabel>}
      <Input
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

export default FormInput
