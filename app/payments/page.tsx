"use client"

import { FileText, Plus, Search } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function PaymentsPage() {
  return (
    <div className="flex-1 p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-zinc-400 mt-1">Manage your payments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="size-4 mr-2" />
          Add Payment
        </Button>
      </header>

      <div className="space-y-6">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Payments</CardTitle>
                <CardDescription className="text-zinc-400">
                  View and manage your payments
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="bg-zinc-900/50 border border-zinc-800 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Payment content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 