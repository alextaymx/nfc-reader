import type { User } from '@supabase/supabase-js';

export type ExtendedUser = {
  user_metadata: {
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    name?: string;
    phone_verified?: boolean;
    sub?: string;
    // add your fields here
  };
} & User;

export type UserMetadata = ExtendedUser['user_metadata'];
