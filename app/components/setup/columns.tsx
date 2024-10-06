
"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { InspectionProgram } from "../SelectProgram"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

const columnHelper = createColumnHelper<InspectionProgram>()

export interface GetColumnProps {
  handleDelete: () => void
}

const getColumns = ({ handleDelete }: GetColumnProps) => {
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
      cell: props =>
        <Button
          variant="ghost"
          onClick={handleDelete}
        >
          <Trash />
        </Button>
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
