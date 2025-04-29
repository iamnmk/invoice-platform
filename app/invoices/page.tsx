"use client"

import { FileText, Plus, Search } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function InvoicesPage() {
  return (
    <div className="flex-1 p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-zinc-400 mt-1">Manage your invoices</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="size-4 mr-2" />
          Create Invoice
        </Button>
      </header>

      <div className="space-y-6">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription className="text-zinc-400">
                  View and manage your invoices
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="bg-zinc-900/50 border border-zinc-800 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-800/50">
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">INVOICE</th>
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">CLIENT</th>
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">AMOUNT</th>
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">DATE</th>
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">STATUS</th>
                    <th className="text-left p-3 text-xs font-medium text-zinc-400">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    {
                      id: "INV-0012",
                      client: "Acme Corp",
                      amount: "$2,500.00",
                      date: "Apr 28, 2023",
                      status: "Paid",
                    },
                    {
                      id: "INV-0011",
                      client: "Globex Inc",
                      amount: "$1,800.00",
                      date: "Apr 25, 2023",
                      status: "Pending",
                    },
                    {
                      id: "INV-0010",
                      client: "Stark Industries",
                      amount: "$3,200.00",
                      date: "Apr 20, 2023",
                      status: "Paid",
                    },
                    {
                      id: "INV-0009",
                      client: "Wayne Enterprises",
                      amount: "$1,200.00",
                      date: "Apr 18, 2023",
                      status: "Overdue",
                    },
                    {
                      id: "INV-0008",
                      client: "Umbrella Corp",
                      amount: "$950.00",
                      date: "Apr 15, 2023",
                      status: "Paid",
                    },
                  ].map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-zinc-800/30">
                      <td className="p-3 text-white">{invoice.id}</td>
                      <td className="p-3 text-white">{invoice.client}</td>
                      <td className="p-3 text-white">{invoice.amount}</td>
                      <td className="p-3 text-zinc-400">{invoice.date}</td>
                      <td className="p-3">
                        <Badge
                          className={
                            invoice.status === "Paid"
                              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                              : invoice.status === "Pending"
                                ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                                : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 