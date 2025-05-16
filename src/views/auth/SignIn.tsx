import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { BsGithub, BsMicrosoft } from "react-icons/bs";
import { useAuth } from "context/AuthProvider";

export default function SignIn() {
  const { login } = useAuth();

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Use one of this providers to sign in!
        </p>
        <button onClick={() => login({}, 'google')} className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </button>
        <button onClick={() => login({}, 'azure')} className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <BsMicrosoft />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Microsoft
          </h5>
        </button>
        <button onClick={() => login({}, 'github')} className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <BsGithub />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Github
          </h5>
        </button>
      </div>
    </div>
  );
}
