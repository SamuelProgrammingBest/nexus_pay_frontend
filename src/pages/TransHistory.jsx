import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const TransHistory = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setloading] = useState(false);
  const [type, setType] = useState("")

  const token = localStorage.getItem("token");


  useEffect(() => {
    const getTransfers = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          "https://nexus-pay-backend-t4aq.onrender.com/api/v3/transferHistory?page=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res) {
          console.log("Transaction History Failed");
          setTransfers([]);
          setloading(true);
        }

        console.log(res.data);
        setTransfers(res.data.data);
        setloading(false);

        console.log(transfers);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getTransfers();
  }, []);

  const { transactions } = transfers;

  const filter = ()=> {
    // console.log(type)
    if (!transactions) return [];

    if(type !== ""){
    return transactions.filter(trans => trans.type == type)
    } else {
      return transactions
    }
  }
  console.log(transactions)
  console.log(filter())

  let filteredTransactions = filter()

  // Generic placeholder data
  // const mockTransactions = [
  //   {
  //     id: 1,
  //     description: "Payment to Sarah Johnson",
  //     type: "debit",
  //     amount: 250.0,
  //     date: "Mar 28, 2025",
  //     time: "2:45 PM",
  //     status: "completed",
  //     recipient: "Sarah J.",
  //   },
  //   {
  //     id: 2,
  //     description: "Salary deposit",
  //     type: "credit",
  //     amount: 3500.0,
  //     date: "Mar 25, 2025",
  //     time: "9:00 AM",
  //     status: "completed",
  //     recipient: "Employer Inc.",
  //   },
  //   {
  //     id: 3,
  //     description: "Payment to Michael Chen",
  //     type: "debit",
  //     amount: 175.5,
  //     date: "Mar 22, 2025",
  //     time: "4:15 PM",
  //     status: "completed",
  //     recipient: "Michael C.",
  //   },
  //   {
  //     id: 4,
  //     description: "Utility bill payment",
  //     type: "debit",
  //     amount: 89.99,
  //     date: "Mar 20, 2025",
  //     time: "10:30 AM",
  //     status: "completed",
  //     recipient: "Power Co.",
  //   },
  //   {
  //     id: 5,
  //     description: "Refund received",
  //     type: "credit",
  //     amount: 45.0,
  //     date: "Mar 18, 2025",
  //     time: "1:20 PM",
  //     status: "completed",
  //     recipient: "Store A",
  //   },
  //   {
  //     id: 6,
  //     description: "Payment to Emma Wilson",
  //     type: "debit",
  //     amount: 320.75,
  //     date: "Mar 15, 2025",
  //     time: "3:45 PM",
  //     status: "completed",
  //     recipient: "Emma W.",
  //   },
  // ];

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
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Transaction History
            </h1>
            <p className="mt-2 text-slate-400">
              All your transfers and payments in one place
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-end border-b border-slate-800/60">
            <label htmlFor="type" className="sr-only">
              Filter transactions
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="appearance-none w-40 rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-2 pr-8 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              >
                <option value="">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="h-4 w-4 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {(filteredTransactions.length > 0) ? (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="transition duration-200 hover:bg-slate-900/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 ring-1 ring-slate-800/80">
                            <svg
                              className={`h-5 w-5 ${
                                transaction.type === "credit"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {transaction.type === "credit" ? (
                                <>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </>
                              ) : (
                                <>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 12h16"
                                  />
                                </>
                              )}
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {transaction.transferDesc || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white tracking-wider">
                            {transaction.date.split(",")[0]}
                          </p>
                          <p className="text-xs text-slate-400">
                            {transaction.date.split(",")[1]}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-500/20">
                          Completed 👍
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/transfer/${transaction.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-300 transition duration-200 hover:border-sky-500/60 hover:bg-sky-500/20"
                        >
                          View
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-slate-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
          </div>
        </main>
      )}
    </div>
  );
};

export default TransHistory;
