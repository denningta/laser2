'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  serialPort: z.string(),
  baudRate: z.number().min(2),
  autoConnect: z.boolean()
})

const SerialForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialPort: "",
      baudRate: 9600,
      autoConnect: true
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-8 max-w-sm">
        <FormField
          control={form.control}
          name="serialPort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Port</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a serial port..."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="com3">COM 3</SelectItem>
                  <SelectItem value="com7">COM 7</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baudRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baud Rate</FormLabel>
              <Input type="number" {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoConnect"
          render={({ field }) => (
            <FormItem>
              <div className="space-x-5 flex items-center">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <FormLabel>Auto connect</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )

}

export default SerialForm
