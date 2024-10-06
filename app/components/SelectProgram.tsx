import { Select, SelectContent, SelectTrigger } from "@/components/ui/select"
import { SelectGroup, SelectItem, SelectLabel, SelectValue } from "@radix-ui/react-select"

export type InspectionProgram = {
  id: string
  title: string
}

export interface SelectProgramProps {
  options: InspectionProgram[]
}

const SelectProgram = ({ options }: SelectProgramProps) => {

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an inspeciton program" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Inspection program</SelectLabel>
          {options.map(option => (
            <SelectItem value={option.id}>{option.title}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>

    </Select>
  )


}

export default SelectProgram
