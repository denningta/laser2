
"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { InspectionProgram } from "../SelectProgram"
import { MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

const columnHelper = createColumnHelper<InspectionProgram>()

export interface GetColumnProps {
  handleDelete: (program: InspectionProgram) => void
}

const getColumns = ({ handleDelete }: GetColumnProps) => {
  const columns: ColumnDef<InspectionProgram>[] = [
    {
      accessorKey: "id",
      header: "Program Id",
      size: 80,
      maxSize: 80
    },
    {
      accessorKey: "title",
      header: "Title"
    },
    columnHelper.display({
      id: "actions",
      size: 10,
      cell: props =>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <DropdownMenuItem onClick={() => handleDelete(props.row.original)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

    })
  ]

  return columns
}


const columns: ColumnDef<InspectionProgram>[] = [
  {
    accessorKey: "id",
    header: "Program Id"
  },
  {
    accessorKey: "title",
    header: "Title"
  },
  columnHelper.display({
    id: "actions",
    cell: props => <Button variant="ghost"><Trash /></Button>
  })
]

export default getColumns
