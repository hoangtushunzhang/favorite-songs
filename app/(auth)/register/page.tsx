"use client";
import { register } from "@/actions/auth";
import { RegisterState } from "@/types";
import Link from "next/link";
import { useActionState } from "react";

const Register = () => {
  const [state, action, isPending] = useActionState<
    RegisterState | undefined,
    FormData
  >(register, undefined);
  return (
    <div className="w-full max-w-md mx-auto p-6 m-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold m-6 text-center">Register</h1>

      <form action={action} className="space-y-4">
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            type="text"
            placeholder="Enter your email"
            name="email"
            defaultValue={state?.email}
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          {state?.errors?.password && (
            <div className="text-red-500">
              <p>Password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label className="block" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            type="password"
            placeholder="Enter your confirm password"
            name="confirmPassword"
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500">{state.errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        <div className="text-sm text-center">
          <span>Already have an account?</span>
          <Link
            className="text-blue-500 font-medium hover:underline ml-1"
            href={"/login"}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
