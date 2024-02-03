'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import { BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

type VariantType = 'LOGIN' | 'REGISTER';

const SignIn = () => {
  const [variant, setVariant] = useState<VariantType>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const t = useTranslations('signIn');

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      await axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error(t('somenthingWrong')))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      await signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) {
            toast.error(t('somenthingWrong'));
          }

          if (callback?.ok && !callback?.error) {
            toast.success(t('loggedIn'));
            router.push('/');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  // const socialAction = (action: string) => {
  //   setIsLoading(true);

  //   signIn(action, {
  //     redirect: false,
  //   })
  //     .then(callback => {
  //       if (callback?.error) {
  //         toast.error('Something went wrong!');
  //       }

  //       if (callback?.ok && !callback?.error) {
  //         toast.success('Logged in!');
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  return (
    <div className="rounded-2xl flex flex-col justify-center items-center p-3 h-screen">
      <div
        className="absolute top-3 left-3 ring-2 ring-primary p-2 rounded-full text-primary cursor-pointer"
        onClick={() => router.back()}
      >
        <FaArrowLeft size={15} />
      </div>
      <header className="w-full uppercase text-primary font-bold text-4xl md:text-7xl flex justify-around items-center h-32 md:h-40">
        <Link href="/">
          <h1>CHORD.IO</h1>
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-96 flex flex-col gap-2"
      >
        {variant === 'REGISTER' && (
          <Input
            id="name"
            label={t('name')}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          id="email"
          label={t('email')}
          type="email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="password"
          label={t('password')}
          type="password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Button disabled={isLoading} fullWidth>
          {variant === 'LOGIN' ? t('signIn') : t('register')}
        </Button>
        {/* <button
          type="button"
          onClick={() => socialAction('google')}
          className="inline-flex w-full justify-center rounded-md bg-secondary text-white shadow-sm ring-1 ring-inset ring-primary px-3 py-2"
        >
          <BsGoogle />
        </button> */}
      </form>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>{variant === 'LOGIN' ? t('noAccount') : t('hasAccount')}</div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant === 'LOGIN' ? t('createAccount') : t('signIn')}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
