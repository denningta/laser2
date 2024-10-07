"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

export type Result = {
  id: number
  value: number
  judgement: 'go' | 'nogo'
}

const columnHelper = createColumnHelper<Result>()

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: "Feature ID"
  },
  {
    accessorKey: "value",
    header: "Measured value"
  },
  columnHelper.display({
    id: "judgement",
    header: "Judgement",
    cell: ({ row }) => {
      let className = "bg-rose-500 text-white"
      if (row.original.judgement === 'go') {
        className = "bg-emerald-500 text-white"
      }
      return (
        <Badge className={cn(className)}>
          {row.original.judgement === 'go' ? 'Go' : "NoGo"}
        </Badge>
      )
    }
  })
]
