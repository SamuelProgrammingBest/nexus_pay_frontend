import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import * as yup from "yup";

const Bills = () => {
  const [invalid, setInvalid] = useState("");
  const [loading, setLoading] = useState(false);
  const [billValues, setBillValues] = useState({
    desc: "",
    accountNo: 0,
    amount: 0,
  });

  const billers = [
    {
      desc: "Electricity Company",
      image: "https://www.abujaelectricity.com/wp-content/uploads/2024/03/header_white_logo.png",
      accountNo: 1234567890,
      amount: 1200,
    },
    {
      desc: "Water Supply",
      image: "https://fctwb.gov.ng/wp-content/uploads/elementor/thumbs/logo-qdsun9gh6883ctewjpvjfcs2q1rvth1d2vwzf7evgw.png",
      accountNo: 9876543210,
      amount: 1500,
    },
    {
      desc: "Internet Provider",
      image: "https://nairametrics.com/wp-content/uploads/2025/09/MTN-Nigeria-750x375.jpg",
      accountNo: 5555555555,
      amount: 2000,
    },
    {
      desc: "Mobile Carrier",
      image: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/GLO.png",
      accountNo: 1111111111,
      amount: 2500,
    },
    {
      desc: "Gas Company",
      image: "https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/381059994_699405148883651_8762812335802837040_n.png?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=oLpKymvDKIsQ7kNvwGumvGR&_nc_oc=AdodweicZsnYO-aETqPBB1uq1gsBYShdMAPXDBkUo851VIgHA7OHgPxqyRRNl5PwgkU&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=mSH4sopzt4MTSoltA-tzSw&_nc_ss=7a389&oh=00_Af0wngyQn2pEDBdNFZyz_b3YTJRT2So_7DGldUEyr2rTdA&oe=69E47286",
      accountNo: 2222222222,
      amount: 3000,
    },
    {
      desc: "Streaming Service",
      image: "https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456",
      accountNo: 3333333333,
      amount: 3500,
    },
  ];

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
    initialValues: { PIN: "" },
    onSubmit: async (values) => {
      console.log({ values, billValues });
      if (billValues.desc == "") {
        setInvalid("U no select bill na");
        return;
      } else {
        await makeTransfer({
          desc: billValues.desc,
          amount: billValues.amount,
          accountNo: billValues.accountNo,
          PIN: Number(values.PIN),
        });
      }
    },
    validationSchema: yup.object({
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
        {invalid === "Transfer successful!" ?( <div className="mb-4 rounded bg-green-500/10 px-4 py-3 text-sm text-green-400">{invalid}</div>) : (invalid !== "" && <div className="mb-4 rounded bg-red-500/10 px-4 py-3 text-sm text-red-400">{invalid}</div>)}

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 rounded-lg bg-slate-900/60 p-6 shadow-lg ring-1 ring-slate-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {billers.map((bill, i) => (
              <div
                key={i}
                onClick={() => {
                  setBillValues((prev) => ({
                    ...prev,
                    desc: bill.desc,
                    accountNo: bill.accountNo,
                    amount: bill.amount,
                  }));
                }}
                className={`border border-slate-800/50 rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-shadow hover:shadow-lg ${bill.desc == billValues.desc && "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white ring-2 ring-emerald-500/30"}`}
              >
                <img
                  src={bill.image}
                  alt={bill.desc}
                  className="h-15 w-15 rounded-md bg-white/5 p-1 object-contain"
                />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{bill.desc}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    ${bill.amount.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bill.desc == billValues.desc && (
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
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

export default Bills;
