import { SignUp } from "@clerk/nextjs";



const SignUpPage = () => (
  <div className='w-full flex justify-center items-center bg-gray-50 pt-10 pb-60'>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
  );

export default SignUpPage;