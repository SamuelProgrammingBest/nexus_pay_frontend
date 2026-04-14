import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Transfer = () => {
  const [invalid, setInvalid] = useState("");
  const [loading, setLoading] = useState(false);

  const makeTransfer = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://nexus-pay-backend-t4aq.onrender.com/api/v3/transferMoney",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res) {
        setInvalid("Transfer successful!");
        setTimeout(() => setInvalid(""), 5000);
        setLoading(false);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setLoading(false);
      if (error.response?.data?.message === "Ur PIN is incorrect") {
        setInvalid("Invalid PIN. Please try again.");
      } else if (error.response?.data === "Failed transfer") {
        setInvalid("Transfer failed. Please try again.");
      } else if (
        error.response?.data?.message === "Transferee account not found"
      ) {
        setInvalid(
          "Transferee account not found. Please check the account number.",
        );
      } else if (
        error.response?.data?.message ===
        "Insufficient balance ooo U no get enough mular"
      ) {
        setInvalid("Insufficient balance. Please top up your account.");
      } else if (
        error.response?.data?.message ===
        "Aaaaaa I got you 😁😁😎😎 user account is the same thing na waw for u "
      ) {
        setInvalid(
          "You cannot transfer to your own account. Please check the account number.",
        );
      } else {
        setInvalid("An error occurred. Please try again.");
      }

      setTimeout(() => setInvalid(""), 5000);
    }
  };

  let formik = useFormik({
    initialValues: { PIN: "", desc: "", amount: 0, accountNo: 0 },
    onSubmit: async (values) => {
      console.log(values);
      await makeTransfer({
        desc: values.desc,
        amount: values.amount,
        accountNo: values.accountNo,
        PIN: Number(values.PIN),
      });
    },
    validationSchema: yup.object({
      desc: yup.string(),
      amount: yup.number().min(100, "Minimum transfer is 100"),
      accountNo: yup.number().integer(),
      PIN: yup
        .string()
        .matches(/^\d{4}$/, "PIN must be exactly 4 digits")
        .required("PIN is required"),
    }),
  });

  return (
    <main className="w-full">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
          Transfer
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Send money securely
        </h1>
        <p className="max-w-2xl text-slate-400">
          Enter the recipient details and authorize your transfer with your
          secure PIN.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {/* {invalid !== "" && <div className="mb-4 rounded bg-red-500/10 px-4 py-3 text-sm text-red-400">{invalid}</div>} */}
        {invalid === "Transfer successful!" ? (
          <div className="mb-4 rounded bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {invalid}
          </div>
        ) : (
          invalid !== "" && (
            <div className="mb-4 rounded bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {invalid}
            </div>
          )
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 rounded-lg bg-slate-900/60 p-6 shadow-lg ring-1 ring-slate-800"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Recipient account
            </label>
            <input
              name="accountNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              value={formik.values.accountNo}
              placeholder="1234567890"
              className="w-full text-lg rounded-lg border border-slate-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
            {formik.touched.accountNo && formik.errors.accountNo && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.accountNo}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Amount
            </label>
            <input
              name="amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              type="number"
              placeholder="$ 1000"
              className="w-full rounded-lg border border-slate-800 bg-transparent px-4 py-3 text-lg font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.amount}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Reference
            </label>
            <input
              name="desc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
              placeholder="Gift for family"
              className="w-full rounded-lg border border-slate-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
            {formik.touched.desc && formik.errors.desc && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.desc}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              4-digit PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              name="PIN"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PIN}
              placeholder="••••"
              aria-label="4-digit PIN"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-center text-xl font-semibold text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
            {formik.touched.PIN && formik.errors.PIN && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.PIN}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow hover:opacity-95 cursor-pointer justify-center items-center inline-flex"
            >
              {loading ? "" : "Proceed"}
              <HashLoader
                loading={loading}
                color="#1c1c1d"
                size={20}
                className="ml-2"
              />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Transfer;
