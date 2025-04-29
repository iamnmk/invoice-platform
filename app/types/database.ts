export type Database = {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string
          organization_id: string
          invoice_number: string
          client_name: string
          client_email: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['invoices']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Database['public']['Tables']['invoices']['Row'], 'id'>>
      }
    }
  }
}

export type Invoice = Database['public']['Tables']['invoices']['Row'] 