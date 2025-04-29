"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, CreditCard, Download, FileText, Plus } from "lucide-react"
import { getRecords } from "@/lib/db"
import type { Invoice } from "@/types/database"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInvoices() {
      try {
        // TODO: Replace with actual organization_id
        const data = await getRecords('invoices', { organization_id: 'your-org-id' })
        setInvoices(data)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  // Calculate dashboard metrics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount_total, 0)
  const activeInvoices = invoices.filter(invoice => invoice.status === 'Sent').length
  const pendingPayments = invoices.filter(invoice => invoice.status === 'Sent' && new Date(invoice.due_date!) > new Date()).length
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'Overdue').length

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
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-zinc-400">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Invoices</CardTitle>
                  <FileText className="size-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeInvoices}</div>
                  <p className="text-xs text-zinc-400">Currently active</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="size-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingPayments}</div>
                  <p className="text-xs text-zinc-400">Awaiting payment</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
                  <Badge variant="destructive" className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/20">
                    {overdueInvoices}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overdueInvoices}</div>
                  <p className="text-xs text-zinc-400">Require attention</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent invoice and payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : invoices.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400">No invoices found</div>
                ) : (
                  <div className="space-y-4">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                            <FileText className="size-4 text-zinc-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{invoice.invoice_number}</div>
                            <div className="text-sm text-zinc-400">{invoice.client_name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium text-white">${invoice.amount_total.toFixed(2)}</div>
                            <div className="text-sm text-zinc-400">{new Date(invoice.created_at).toLocaleDateString()}</div>
                          </div>
                          <Badge
                            className={
                              invoice.status === "Paid"
                                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                : invoice.status === "Overdue"
                                ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                                : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <div className="font-medium text-white">Monthly Report</div>
                    <div className="text-sm text-zinc-400">Generated on {new Date().toLocaleDateString()}</div>
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