'use client';
import type { UserMetadata } from '@/lib/type';
import type { SubmitHandler } from 'react-hook-form';
import { notifyError, notifySuccess } from '@/components/toast/notify';
import { createClient } from '@/utils/supabase/client';

import { KeyRound, Mail, User } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type IFormInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ProfileForm() {
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState(true);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      const user = data.user;
      const userMetadata: UserMetadata = user.user_metadata;

      if (user) {
        reset({
          name: userMetadata.name,
          email: user.email,
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.log(error);
      notifyError('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [supabase, reset]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function updateProfile({ name, password, email }: IFormInput) {
    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        data: { name, full_name: name },
        password: password || undefined,
        email,
      });
      if (error) {
        const errorMessage = error.message;
        if (errorMessage) {
          notifyError(errorMessage);
        } else {
          throw error;
        }
      } else {
        notifySuccess('Profile updated!');
      }
    } catch (error) {
      notifyError('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          {/* name */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Name</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <User className="size-4 opacity-70" />
                <input
                  type="text"
                  placeholder="Type here"
                  className="grow"
                  {...register('name', { required: true })}
                />
              </div>
              {errors.name && (
                <div className="label">
                  <span className="label-text-alt text-error">This field is required</span>
                </div>
              )}
            </div>
            {/* email */}
            <div>
              <div className="label">
                <span className="label-text font-bold">Email</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <Mail className="size-4 opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
              </div>
              {errors.email && (
                <div className="label">
                  <span className="label-text-alt text-error">This field is required</span>
                </div>
              )}
            </div>
            {/* password */}
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Password</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <KeyRound className="size-4 opacity-70"></KeyRound>
                <input
                  type="password"
                  className="grow"
                  placeholder="Type here"
                  autoComplete="new-password"
                  {...register('password')}
                />
              </div>
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Confirm Password</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <KeyRound className="size-4 opacity-70"></KeyRound>
                <input
                  type="password"
                  className="grow"
                  placeholder="Type again"
                  autoComplete="new-password"
                  {...register('confirmPassword', { validate: (value, formValues) => {
                    return value === formValues.password || 'The passwords do not match';
                  } })}
                />
              </div>
              <div className="label">
                <span className="label-text-alt text-error">{errors.confirmPassword?.message}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
