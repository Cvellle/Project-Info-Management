// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useForm } from 'react-hook-form'
import { createUser } from '../api/registerAPI'

export function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = (data) => {
    createUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">First name</FormLabel>
        <Input
          id="name"
          placeholder="name"
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' }
          })}
        />
        <Input
          id="email"
          placeholder="email"
          {...register('email', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' }
          })}
        />
        <Input
          id="password"
          placeholder="password"
          {...register('password', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' }
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}
