"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import useStore from "../hooks/useStore"
import { useEffect, useState } from "react"

export type InspectionProgram = {
  id: string
  title: string
}

export interface SelectProgramProps {
  options: InspectionProgram[]
}

const SelectProgram = () => {
  const { get } = useStore()
  const [programs, setPrograms] = useState<InspectionProgram[]>([])

  useEffect(() => {
    getPrograms()
  }, [])


  const getPrograms = async () => {
    const prgs = await get<InspectionProgram[]>('programs')
    setPrograms(prgs ?? [])

  }

  return (
    <Select>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select an inspeciton program" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {programs.map((program, i) => (
            <SelectItem key={i} value={program.id}>{program.title}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>

    </Select>
  )


}

export default SelectProgram
