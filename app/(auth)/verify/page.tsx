import Link from "next/link";

const Verify = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 m-8 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-3xl font-bold m-6">Check Your Email!</h1>
      <p className="text-gray-600">
        We have sent a verification email to your inbox. Please check your email and click the
        verification link to activate your account.
      </p>
      <div className="mt-4">
        <Link className="text-blue-500 font-medium hover:underline" href="/login">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Verify;
