import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInImage from "../assets/login.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { HashLoader } from "react-spinners";

const SignInPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [invalid, setInvalid] = useState(false);

  const loginHandler = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://nexus-pay-backend-t4aq.onrender.com/api/v3/login",
        values,
      );

      if (!res) {
        console.log("Login Failed");
      }

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      setLoading(false);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      
      console.log(error);

      if(error.response.data) setLoading(false)
      
      if(!error.response.data) {
        setInvalid(true)
      }

      if (error.response.data.message === "Email and password is invalid") {
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 2000);
      }

      if (error.response.data.message === "Email or password is invalid") {
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 2000);
      }
    }
  };
  // useEffect(() => {
  //   document.title = "Nexus Pay - Sign In";
  // }, [])

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      loginHandler(values);
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-10 rounded-[2rem] border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-0">
          <div className="flex flex-col justify-center gap-8 rounded-[2rem] bg-slate-950/95 p-10 lg:p-14">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Secure login
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Welcome back to Nexus Pay.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-400">
                Access your business dashboard, approve transfers, and monitor
                cash flow with a secure modern login experience.
              </p>
            </div>

            {invalid ? (
              <p className="text-red-500 text-sm">Invalid email or password</p>
            ) : (
              ""
            )}

            <form
              className="space-y-8 flex flex-col"
              onSubmit={formik.handleSubmit}
            >
              <label className="space-y-4 text-sm text-slate-300">
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </label>

              <label className="space-y-4 text-sm text-slate-300">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter password"
                  className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
                disabled={loading}
              >
                {loading ? "" : "Log In"}
                <HashLoader
                  loading={loading}
                  color="#1c1c1d"
                  size={20}
                  className="ml-2"
                />
              </button>
            </form>

            <p className="text-sm text-slate-500">
              New to Nexus Pay?{" "}
              <Link
                to="/signUp"
                className="text-white underline-offset-4 transition hover:text-sky-300 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950/95 lg:min-h-[660px]">
            <img
              src={signInImage}
              alt="Secure access"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-10 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Fast, secure access
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Stay in control of your business finances.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Use Nexus Pay to manage permissions, track activity, and lock
                down your company’s banking with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
