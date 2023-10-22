import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbSocial } from 'react-icons/tb';
import { TextInput, Loading, CustomButton } from '../components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const [errMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-bgColor min-h-screen flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 lg:h-full py-6 lg:py-0 flex flex-col bg-primary rounded-xl overflow-hidden shadow-xl'>
        <div className='p-10 lg:px-20 flex flex-col justify-center'>
          <div className='flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>Socio</span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>Create Account</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='py-8 flex flex-col gap-5'
          >
            <div className='flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='firstName'
                placeholder='First Name'
                label='First Name'
                type='text'
                register={register('firstName', {
                  required: 'First Name is required',
                })}
                styles='w-full rounded-full'
                labelStyle='ml-2'
                error={errors.firstName ? errors.firstName.message : ''}
              />

              <TextInput
                name='lastName'
                placeholder='Last Name'
                label='Last Name'
                type='text'
                register={register('lastName', {
                  required: 'Last Name is required',
                })}
                styles='w-full rounded-full'
                labelStyle='ml-2'
                error={errors.lastName ? errors.lastName.message : ''}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register('email', {
                required: 'Email Address is required',
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ''}
            />

            <div className='flex flex-col lg:flex-row gap-1 md:gap-2'>
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

              <TextInput
                name='confirmPassword'
                placeholder='Confirm Password'
                label='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                register={register('confirmPassword', {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password !== value) {
                      return 'Passwords do not match';
                    }
                  },
                })}
                error={
                  errors.confirmPassword && errors.confirmPassword.type === 'validate'
                    ? errors.confirmPassword?.message
                    : ''
                }
                styles='w-full rounded-full'
                labelStyle='ml-2'
              />
            </div>

            <button
              type='button'
              className='text-sm text-right text-blue font-semibold mt-2'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>

            {errMsg && (
              <span
                role='alert'
                className={`text-sm ${
                  errMsg.status === 'failed' ? 'text-[#f64949fe]' : 'text-[#2ba150fe]'
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
                  inline-flex justify-center rounded-full bg-gradient-to-r                   from-[#2196f3] to-[#1976d2]
                  px-8 py-3 text-lg font-bold text-white shadow-lg hover:shadow-xl
                  focus:ring-2 focus:ring-offset-2 focus:ring-[#1976d2] transition-transform transform
                  ease-in-out duration-300 hover:scale-105 active:scale-95 outline-none
                `}
                title='Create Account'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Already have an account?{''}
            <Link to='/login' className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
