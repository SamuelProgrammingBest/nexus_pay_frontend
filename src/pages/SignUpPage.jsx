import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signUpImage from '../assets/signUp.jpg'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { HashLoader } from 'react-spinners'

const SignUpPage = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [invalid, setInvalid] = useState(false)
  

  const signUp = async (values) => {
    try {
      setLoading(true)
      console.log(values)
      const res = await axios.post("https://nexus-pay-backend-t4aq.onrender.com/api/v3/createAccount", values)

      if(!res) console.log("Sign Up Failed")

      console.log(res.data)

      localStorage.setItem("token", res.data.token)
      
      const token = localStorage.getItem("token")
      
      setLoading(false)

      navigate("/dashboard")

    } catch (error) {
      console.error("Signup error:", error.response?.status, error.response?.data);

      if(error.response.data) setLoading(false)

      if(error.response.data.message === "Account already exists"){
        setInvalid(true)
        setLoading(false)
        setTimeout(()=> {
          setInvalid(false)
        }, 3000)
      }
    }
  }


  let formik = useFormik({
    initialValues:{
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      NIN: '',
      PIN: ''
    },

    onSubmit: (values) =>{
      console.log("Submitting:", values)
      signUp({
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        NIN: values.NIN,
        PIN: values.PIN
      })
    },

    validationSchema:yup.object({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string().required("Middle name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      NIN: yup.string().matches(/^\d{11}$/, "NIN must be exactly 11 digits").required("NIN is required"),
      PIN: yup.string().matches(/^\d{4}$/, "PIN must be exactly 4 digits").required("PIN is required"),
    })
  })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-10 rounded-[2rem] border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-0">
          <div className="flex flex-col justify-center gap-8 rounded-[2rem] bg-slate-950/95 p-10 lg:p-14">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Create your account</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Join Nexus Pay and take control of your business banking.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-400">
                Sign up in minutes to simplify payments, manage approvals, and access modern banking tools built for fast-moving teams.
              </p>
            </div>

            {/* ✅ FIXED FORM */}
            {invalid && <p className="text-red-500 text-sm">Account already exists</p>}
            <form className="space-y-8 flex flex-col" onSubmit={formik.handleSubmit}>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-4 text-sm text-slate-300">
                  <span>First name</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                  )}
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Middle name</span>
                  <input
                    type="text"
                    name="middleName"
                    placeholder="A."
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.middleName && formik.errors.middleName && (
                    <p className="text-red-500 text-sm">{formik.errors.middleName}</p>
                  )}
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-4 text-sm text-slate-300">
                  <span>Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                  )}
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-4 text-sm text-slate-300">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>NIN number</span>
                  <input
                    type="text"
                    name="NIN"
                    placeholder="12345678901"
                    value={formik.values.NIN}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                  />
                  {formik.touched.NIN && formik.errors.NIN && (
                    <p className="text-red-500 text-sm">{formik.errors.NIN}</p>
                  )}
                </label>
              </div>

              <label className="space-y-4 text-sm text-slate-300">
                <span>PIN</span>
                <input
                  type="text"
                  name="PIN"
                  placeholder="4-digit PIN"
                  value={formik.values.PIN}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
                />
                {formik.touched.PIN && formik.errors.PIN && (
                  <p className="text-red-500 text-sm">{formik.errors.PIN}</p>
                )}
              </label>

              <button
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? '' : 'Sign Up'}
                <HashLoader
                  loading={loading}
                  color="#1c1c1d"
                  size={20}
                  className="ml-2"
                />
              </button>
            </form>

            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/signIn" className="text-white underline-offset-4 transition hover:text-sky-300 hover:underline">
                Login here
              </Link>
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950/95 lg:min-h-[660px]">
            <img src={signUpImage} alt="Welcome to Nexus Pay" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-10 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Why choose Nexus Pay?</p>
              <h2 className="mt-4 text-3xl font-semibold">Banking built to scale with your business.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Benefit from secure payments, business controls, and real-time insights that make operations faster and more transparent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage