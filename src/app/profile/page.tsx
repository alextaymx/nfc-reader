import ProfileForm from './profile-form';

export default async function ProfilePage() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/sign-in');
  // }

  // const userMetadata: UserMetadata = user.user_metadata;

  return (
    <div>
      <ProfileForm />
    </div>
  );
}
