import { FormLabel, Textarea } from '@chakra-ui/react'

const FormTextarea = ({ name, label, placeholder, autoComplete, register, defaultValue }) => {
  return (
    <>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Textarea
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

export default FormTextarea
