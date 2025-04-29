"use client"

import { FileText, CreditCard, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "floating"
  defaultOpen?: boolean
}

export function Sidebar({ className, variant = "default", defaultOpen = true, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-zinc-900/50 border-r border-zinc-800 backdrop-blur-sm",
        variant === "floating" && "fixed left-0 top-0 z-50",
        !defaultOpen && "hidden",
        className
      )}
      {...props}
    >
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <FileText className="size-4 text-white" />
          </div>
          <div className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            InvoiceAI
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/dashboard"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <FileText className="size-4" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/invoices"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/invoices"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <FileText className="size-4" />
              <span>Invoices</span>
            </Link>
          </li>
          <li>
            <Link
              href="/payments"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/payments"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <CreditCard className="size-4" />
              <span>Payments</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          )}
        >
          <Settings className="size-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = true, ...props }: SidebarProviderProps) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar defaultOpen={defaultOpen} {...props} />
      <main className="flex-1">{children}</main>
    </div>
  )
} 