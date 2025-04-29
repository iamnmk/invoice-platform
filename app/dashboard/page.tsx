"use client"

import { useState } from "react"
import { ArrowUpRight, CreditCard, Download, FileText, Plus } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back, Alex</p>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
                  <Plus className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create New Invoice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="size-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-medium">
            AJ
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-zinc-800">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-zinc-800">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <ArrowUpRight className="size-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-zinc-400">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Invoices</CardTitle>
                  <FileText className="size-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-zinc-400">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="size-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-zinc-400">+1 from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
                  <Badge variant="destructive" className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/20">
                    2
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,234.56</div>
                  <p className="text-xs text-zinc-400">+$234.56 from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent invoice and payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                  ].map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                          <FileText className="size-4 text-zinc-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{invoice.id}</div>
                          <div className="text-sm text-zinc-400">{invoice.client}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-white">{invoice.amount}</div>
                          <div className="text-sm text-zinc-400">{invoice.date}</div>
                        </div>
                        <Badge
                          className={
                            invoice.status === "Paid"
                              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Your revenue trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-zinc-400">
                  Revenue chart will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Download your monthly report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50">
                  <div>
                    <div className="font-medium text-white">April 2023 Report</div>
                    <div className="text-sm text-zinc-400">Generated on Apr 30, 2023</div>
                  </div>
                  <Button variant="outline" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 