import Link from 'next/link'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router';


const LoginScreen = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
          router.push(redirect || '/');
        }
      }, [router, session, redirect]);

    const {
            handleSubmit,
            register,
            formState: { errors },
        } = useForm();
    
    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
              redirect: false,
              email,
              password,
            });
            if (result.error) {
              toast.error(result.error);
            }
          } catch (err) {
            toast.error(getError(err));
          }
    }

  return (
    <Layout title={`Login`}>
        <form className='mx-auto max-w-screen-sm' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl font-bold text-center'>Login</h1>
            <div className='mb-4'>
                <label className='' htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    {...register('email', {
                        required: 'Please enter email',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                          message: 'Please enter valid email',
                        },
                      })}
                    id='email' 
                    className='w-full' 
                    autoFocus 
                    placeholder='Enter your email' 
                />
                {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                )}
            </div>
            
            <div className='mb-4'>
                <label className='' htmlFor='password'>Password</label>
                <input 
                    type="password"
                    {...register('password', {
                      required: 'Please enter password',
                      minLength: { value: 6, message: 'password should be more than 5 characters' },
                    })}
                    id='password' 
                    className='w-full' 
                    autoFocus 
                    placeholder='Enter your password' 
                />
                 {errors.password && (
                    <div className="text-red-500 ">{errors.password.message}</div>
                )}
            </div>
            
            <div className='mb-4'>
                <button className='primary-button w-full'>Login</button>
            </div>

            <div className='mb-4 text-center'>
                Don&apos;t have an account? &nbsp;
                <Link href={`register`}><a>Register</a></Link>
            </div>
        </form>
    </Layout>
  )
}

export default LoginScreen