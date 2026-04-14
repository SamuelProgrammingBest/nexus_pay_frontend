import React, { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
// import Chart from "react-apexcharts";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const local = localStorage.getItem("user");
  const user = JSON.parse(local);

  const [transfers, setTransfers] = useState([]);
  const [loading, setloading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const getUserAnalytics = async () => {
      try {
        const response = await axios.get(
          "https://nexus-pay-backend-t4aq.onrender.com/api/v3/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response) {
          console.log("User Analytics Failed");
        }

        console.log(response.data.data);
        setAnalytics(response.data.data);
        // return res.data.data
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    const getTransfers = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          "https://nexus-pay-backend-t4aq.onrender.com/api/v3/transferHistory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res) {
          console.log("Transaction History Failed");
          setTransfers([]);
          setloading(false);
        }

        console.log(res.data);
        setTransfers(res.data.data);

        console.log(transfers);

        setloading(false);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    getTransfers();
    getUserAnalytics();

    // const analytics = getUserAnalytics();
    // console.log(analytics);
  }, []);

  const { transactions } = transfers;
  console.log(transactions);
  const { userAcc } = analytics || {};


  return (
    <div className="">
      {loading ? (
        <div className="flex w-full justify-center items-center h-screen">
          <ClimbingBoxLoader
            loading={loading}
            color="#34edfc"
            size={20}
            className="ml-2"
          />
        </div>
      ) : (
        <main className="min-h-screen bg-slate-950 text-slate-100">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Welcome back, {userAcc?.firstName || "User"}! 👋👋👋
              </h1>
              <p className="mt-2 text-slate-400">
                Here's an overview of your Nexus Pay account.
              </p>
            </div>

            {/* Main Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Balance & Card */}
              <div className="space-y-8 lg:col-span-2">
                {/* Balance Card */}
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                        Total Balance
                      </p>
                      <p className="mt-2 text-4xl font-semibold text-white">
                        $
                        {userAcc?.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Account Number — {userAcc?.accountNo}
                      </p>
                    </div>
                    <div className="text-right">
                      <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                        <Link to="/transfer-history">View Details</Link>
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Activity Summary + Chart */}
                <Card>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Activity Summary
                    </h3>
                    <p className="text-sm text-slate-400">Overview</p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-slate-800/40 p-4">
                      <p className="text-sm text-slate-400">Debits</p>
                      <p className="mt-1 text-lg font-semibold text-red-400">
                        ${(analytics?.debits ?? 0)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Count: {analytics?.debitNo ?? 0}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800/40 p-4">
                      <p className="text-sm text-slate-400">Credits</p>
                      <p className="mt-1 text-lg font-semibold text-green-400">
                        ${(analytics?.credits ?? 0)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Count: {analytics?.creditNo ?? 0}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800/40 p-4">
                      <p className="text-sm text-slate-400">Net Transactions</p>
                      <p
                        className={`mt-1 text-lg font-semibold ${(analytics?.netBalance ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        ${(analytics?.netBalance ?? 0)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Transactions: {analytics?.transNo ?? 0}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800/40 p-4">
                      <p className="text-sm text-slate-400">Highest</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Debit ${(analytics?.highestDebit ?? 0)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Credit $
                        {(analytics?.highestCredit ?? 0)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Debit Card */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-0">
                  <div className="relative h-56 p-6 text-white">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 h-16 w-16 rounded-full border-2 border-white/20"></div>
                      <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full border-2 border-white/20"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full border border-white/10"></div>
                      <svg
                        className="absolute top-8 left-8 h-8 w-8 text-white/20"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7S1.732 14.057.458 10zM10 5a5 5 0 100 10 5 5 0 000-10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Chip */}
                          <div className="h-8 w-10 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <div className="h-6 w-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500"></div>
                          </div>
                          <span className="text-sm font-semibold tracking-wider">
                            NEXUS PAY
                          </span>
                        </div>
                        {/* Mastercard-like logo */}
                        <div className="flex items-center gap-1">
                          <div className="h-8 w-8 rounded-full bg-red-500"></div>
                          <div className="h-8 w-8 rounded-full bg-yellow-500 -ml-4"></div>
                        </div>
                      </div>

                      <div>
                        <p className="text-lg font-mono tracking-widest mb-2">
                          **** **** **** 1234
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <p className="text-white/70 uppercase">
                              Card Holder
                            </p>
                            <p className="font-semibold">
                              {userAcc?.firstName} {userAcc?.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/70 uppercase">Expires</p>
                            <p className="font-semibold">12/28</p>
                          </div>
                        </div>
                      </div>

                      {/* Magnetic stripe */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/20"></div>
                    </div>
                  </div>
                </Card>

                {/* Recent Transactions */}
                <Card>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Recent Transactions
                    </h3>
                    <button className="text-sm text-sky-300 hover:text-sky-200">
                      <Link to="/transfer-history">View All</Link>
                    </button>
                  </div>
                  <div className="mt-6 space-y-4">
                    {transactions && transactions.length > 0 ? (
                      transactions.slice(0, 3).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between border-b border-slate-800/50 pb-4 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium text-white">
                              {transaction.transferDesc ||
                                "No description on this transaction"}
                            </p>
                            <p className="text-sm text-slate-400">
                              {transaction.date.toLocaleString()}
                            </p>
                          </div>
                          <p
                            className={`font-semibold ${transaction.type === "credit" ? "text-green-400" : "text-red-400"}`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}$
                            {Math.abs(transaction.amount).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">
                        No transactions to display
                      </p>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-8">
                <Card>
                  <h3 className="text-lg font-semibold text-white">
                    Quick Actions
                  </h3>
                  <div className="mt-6 grid gap-4">
                    <button className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4 text-left transition hover:bg-slate-800/70">
                      <Link to="/transfer" className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-sky-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            Transfer Money
                          </p>
                          <p className="text-sm text-slate-400">
                            Send to another account
                          </p>
                        </div>
                      </Link>
                    </button>

                    <button className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4 text-left transition hover:bg-slate-800/70">
                      <Link to="/bills" className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">Pay Bills</p>
                          <p className="text-sm text-slate-400">
                            Utilities and services
                          </p>
                        </div>
                      </Link>
                    </button>
                  </div>
                </Card>

                {/* Account Summary */}
                <Card>
                  <h3 className="text-lg font-semibold text-white">
                    Account Summary
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Balance</span>
                      <span className="font-semibold text-white">
                        ${userAcc?.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Pending Transactions
                      </span>
                      <span className="font-semibold text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Spending</span>
                      <span className="font-semibold text-white">
                        $2,450.00
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
