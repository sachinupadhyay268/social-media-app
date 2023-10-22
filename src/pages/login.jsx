import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {TbSocial} from "react-icons/tb"
import { TextInput,Loading,CustomButton } from '../components'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'


const Login = () => {
    const{
        register,handleSubmit,formState:{errors},
    } = useForm({
        mood:"onChange"
    });

    const onSubmit =async(data) =>{
        console.log(data)
    }

    const [errMsg,setErrmsg] = useState("");
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>

        <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0
        flex bg-primary rounded-xl overflow-hidden shadow-xl'>
            
            <div className='w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col
            justify-center '>
                <div className='w-full flex gap-2 items-center mb-6'>
                    <div className='p-2 bg-[#065ad8] rounded text-white'>
                        <TbSocial/>
                    </div>
                    <span className='text-2xl  text-[#065ad8] font-semibold'>Socio</span>
                </div>
                <p className='text-ascent-1 text-base font-semibold'>Log in to your account</p>
                <span className='text-sm mt-2 text-ascent-2'>Welcome back</span>

                <form className='py-8 flex flex-col gap-5'
                onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        name="email"
                        placeholder="email@example.com"
                        label = "Email Address"
                        type= "email"
                        register= {
                            register("email",{
                                required:"Email Address is required"
                            })
                        }

                        styles ="w-full rounded-full"
                        labelStyle = 'ml-2'
                        error={errors.email ? errors.email.message : ""}
        
                    />

                        <TextInput
                            name='password'
                            placeholder='Password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            register={register('password', {
                            required: 'Password is required',
                            })}
                            styles='w-full rounded-full'
                            labelStyle='ml-2'
                            error={errors.password ? errors.password.message : ''}
                         />

                        <button
                        type='button'
                        className='text-sm text-right text-blue font-semibold mt-2'
                        onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                         >
                        {showPassword ? 'Hide Password' : 'Show Password'}
                         </button>

                <Link to="/reset-password"
                className='text-sm text-right text-blue font-semibold'>
                    Forgot Password ?
                </Link>
                {
                    errMsg?.message && (
                        <span className={`text-sm ${
                            errMsg?.status =="failed" 
                            ? "text-[#f64949fe]"
                            : "text-[#2ba150fe]"
                        }mt-o.5`}
                        >
                        {errMsg?.message}
                        </span>
                    )
                }

                {
                    isSubmitting ? (
                        <Loading />
                        ) : (
                        <CustomButton
                            type='submit'
                            containerStyles={`
                            inline-flex justify-center rounded-full bg-gradient-to-r from-[#2196f3] to-[#1976d2]
                            px-8 py-3 text-lg font-bold text-white shadow-lg hover:shadow-xl
                            focus:ring-2 focus:ring-offset-2 focus:ring-[#1976d2] transition-transform transform
                            ease-in-out duration-300 hover:scale-105 active:scale-95 outline-none
                            `}
                            title="Login"
                        />
                        )}
                </form>

                <p className='text-ascent-2 text-sm text-center'>
                    Don't have an account?{""}
                    <Link
                    to='/register'
                    className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>

                    Create Account

                    </Link>
                </p>
            </div>

            

            <div></div>

        </div>
     
    </div>
  )
}

export default Login
