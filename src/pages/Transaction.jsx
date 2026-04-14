import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const Transaction = () => {
  const param = useParams();
  const { id } = param;

  const [transfers, setTransfers] = useState({});
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem("token");
  const local = localStorage.getItem("user");
  const user = JSON.parse(local);

  useEffect(() => {
    const getTransfers = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          `https://nexus-pay-backend-t4aq.onrender.com/api/v3/transfers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res) {
          console.log("Transaction History Failed");
          setTransfers({});
          setloading(true);
        }

        console.log(res.data);
        setTransfers(res.data.data);
        setloading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getTransfers();
  }, []);

  const { transaction } = transfers;
  console.log(transfers);

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
        <main className="w-full">
          <div className="mb-8">
            <Link
              to="/transfer-history"
              className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200 transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to History
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Transaction Details
            </h1>
            <p className="mt-2 text-slate-400">
              {/* Transaction ID: {transaction.id || id} */}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Transaction Overview */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      transaction?.type === "credit"
                        ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
                        : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                    }`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {transaction?.type === "credit" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 12h16"
                        />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {transaction?.transferDesc || "Transaction"}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {transaction?.type === "credit"
                        ? "Money received"
                        : "Money sent"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Amount</span>
                    <span
                      className={`text-2xl font-bold ${
                        transaction?.type === "credit"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction?.type === "credit" ? "+" : "-"}$
                      {Math.abs(transaction?.amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Date & Time</span>
                    <span className="text-sm font-medium text-white">
                      {transaction?.date || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-500/20">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* transaction? Details */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Transaction ID
                    </span>
                    <span className="text-sm font-medium text-white">
                      {transaction?.id || id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Account Number
                    </span>
                    <span className="text-sm font-medium text-white">
                      {transaction?.accountNo || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      {transaction?.type == "credit" ? "Sender" : "Recipient"}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {transaction?.recipientName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Reference</span>
                    <span className="text-sm font-medium text-white">
                      {transaction?.transactionId || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Transaction Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                        <svg
                          className="h-10 w-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white">
                        Processing Time
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">Instant</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                        <svg
                          className="h-10 w-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white">
                        Security
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                        <svg
                          className="h-10 w-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white">
                        Fee
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">$0.00</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Need Help?
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  If you have any questions about this transaction?, our support
                  team is here to help.
                </p>
                <button className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div> // <div className=""></div>
  );
};

export default Transaction;
