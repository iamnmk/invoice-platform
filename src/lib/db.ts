import { supabase } from './supabase'
import type { Database } from '@/types/database'

// Type aliases for better readability
type Tables = Database['public']['Tables']
type TableName = keyof Tables & string

// Helper function to get a table
export const getTable = <T extends TableName>(table: T) => {
  return supabase.from(table)
}

// Helper function to get a single record
export const getRecord = async <T extends TableName>(
  table: T,
  id: string
) => {
  const { data, error } = await getTable(table)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Tables[T]['Row']
}

// Helper function to get all records
export const getRecords = async <T extends TableName>(
  table: T,
  filters?: Record<string, any>
) => {
  let query = getTable(table).select('*')

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
  }

  const { data, error } = await query

  if (error) throw error
  return data as Tables[T]['Row'][]
}

// Helper function to create a record
export const createRecord = async <T extends TableName>(
  table: T,
  record: Tables[T]['Insert']
) => {
  const { data, error } = await getTable(table)
    .insert(record)
    .select()
    .single()

  if (error) throw error
  return data as Tables[T]['Row']
}

// Helper function to update a record
export const updateRecord = async <T extends TableName>(
  table: T,
  id: string,
  updates: Tables[T]['Update']
) => {
  const { data, error } = await getTable(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Tables[T]['Row']
}

// Helper function to delete a record
export const deleteRecord = async <T extends TableName>(
  table: T,
  id: string
) => {
  const { error } = await getTable(table)
    .delete()
    .eq('id', id)

  if (error) throw error
}