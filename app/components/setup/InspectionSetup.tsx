"use client"

import DataTable from "../results/data-table"
import getColumns from "./columns"
import { useEffect, useState } from "react"
import { InspectionProgram } from "../SelectProgram"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useStore from "@/app/hooks/useStore"
import { useRouter } from "next/navigation"
import { Row } from "@tanstack/react-table"

const formSchema = z.object({
  id: z.string(),
  title: z.string()
})

const InspectionSetup = () => {
  const [programs, setPrograms] = useState<InspectionProgram[]>([])
  const { get, set } = useStore()
  const router = useRouter()

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    const prgs = await get<InspectionProgram[]>('programs')
    setPrograms(prgs ?? [])
  }

  const form = useForm<InspectionProgram>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: ""
    }
  })

  const handleAddProgram = async (program: InspectionProgram) => {
    const array = [...programs]
    array.push(program)
    setPrograms(array)
    await set('programs', array)
  }

  const updateProgram = (program: InspectionProgram) => {
    const array = [...programs]
    let itemIndex = array.findIndex(item => item.id === program.id)
    if (itemIndex !== -1) {
      array[itemIndex] = { ...array[itemIndex], ...program }
      setPrograms(array)
    }
  }

  const deleteProgram = async (program: InspectionProgram) => {
    const array = [...programs]
    let itemIndex = array.findIndex(item => item.id === program.id)
    if (itemIndex !== -1) {
      array.splice(itemIndex, 1)
      setPrograms(array)
      await set('programs', array)
    }
  }

  const handleRowClick = (row: Row<InspectionProgram>) => {
    router.push(`/settings/${row.original.id}`)

  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add inspection program</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddProgram)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the index of the inspection program in the keyence controller.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Type the title or short description of the inspection program.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={getColumns({ handleDelete: deleteProgram })}
        data={programs}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default InspectionSetup
