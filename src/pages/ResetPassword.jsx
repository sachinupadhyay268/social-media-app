import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CustomButton, Loading, TextInput } from '../components';


const ResetPassword = () => {
    const [errMsg , setErrMsg] = useState("");
    const[isSubmitting,setIsSubmitting] = useState(false);

    const{
        register,
        handleSubmit,

        formState: {errors},
    } = useForm({
        mode:"onChange",
    })

    const onSubmit = async(data) =>{};
  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6 '>

    <div className='bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8
    shadow-md rounded-lg'>
        <p className='text-ascent-1 text-lg font-semibold'>Email Address</p>
        <span className='text-sm text-ascent-2'>
            Enter Email Address used during Registration
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className='py-4 flex flex-col gap-5'>
  <TextInput
    name="email"
    placeholder="email@example.com"
    label="Email Address"
    type="email"
    register={register("email", {
      required: "Email Address is required"
    })}
    styles="w-full rounded-full"
    labelStyles="ml-2"
    error={errors.email ? errors.email.message : ""}
  />

  {errMsg && React.message && (
    <span
      role='alert'
      className={`text-sm ${
        errMsg.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
      } mt-0.5`}
    >
      {errMsg.message}
    </span>
  )}

  {isSubmitting ? (
  <Loading />
) : (
  <CustomButton
    type='submit'
    containerStyles={`
      inline-flex justify-center rounded-full bg-gradient-to-r from-[#42a5f5] to-[#1976d2]
      px-8 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg
      focus:ring-2 focus:ring-offset-2 focus:ring-[#1976d2] transition-transform transform
      ease-in-out duration-200 hover:scale-105 active:scale-95 outline-none
    `}
    title="Submit"
  />
)}

</form>

    </div>
      
    </div>
  )
}

export default ResetPassword
