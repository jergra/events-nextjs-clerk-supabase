import { SignIn } from "@clerk/nextjs";

const SignInPage: any = () => (
  <div className='w-full flex justify-center items-center pt-10 pb-60'>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
  );

export default SignInPage;