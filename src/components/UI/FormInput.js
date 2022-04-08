import { FormLabel, Input } from '@chakra-ui/react'

const FormInput = ({ name, label, placeholder, autoComplete, register, defaultValue }) => {
  return (
    <>
      {label && <FormLabel htmlFor="name">{label}</FormLabel>}
      <Input
        bgColor="white"
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        {...register(name, {
          required: 'This is required'
        })}
      />
    </>
  )
}

export default FormInput
