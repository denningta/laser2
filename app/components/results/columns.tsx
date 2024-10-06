"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Result = {
  id: string
  value: number
}

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: "Feature ID"
  },
  {
    accessorKey: "value",
    header: "Measured value"
  }
]
