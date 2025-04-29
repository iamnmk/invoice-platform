"use client"

import { useState, useEffect } from "react"
import { CreditCard, Plus, Search } from "lucide-react"
import { getRecords } from "@/lib/db"
import type { Invoice } from "@/types/database"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function PaymentsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchInvoices() {
      try {
        // TODO: Replace with actual organization_id
        const data = await getRecords('invoices', { 
          organization_id: 'your-org-id',
          status: 'Sent' // Only fetch invoices that are sent and awaiting payment
        })
        setInvoices(data)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client_email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-zinc-400 mt-1">Track and manage payments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="size-4 mr-2" />
          Record Payment
        </Button>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pending Payments</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 size-4" />
              <Input
                placeholder="Search payments..."
                className="pl-10 bg-zinc-900 border-zinc-800 w-64"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              {searchQuery ? "No payments found matching your search" : "No pending payments found"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <CreditCard className="size-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{invoice.invoice_number}</div>
                      <div className="text-sm text-zinc-400">{invoice.client_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-white">${invoice.amount_total.toFixed(2)}</div>
                      <div className="text-sm text-zinc-400">
                        Due {new Date(invoice.due_date!).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge
                      className={
                        new Date(invoice.due_date!) < new Date()
                          ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                          : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                      }
                    >
                      {new Date(invoice.due_date!) < new Date() ? "Overdue" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 