"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createStore, Store } from "@tauri-apps/plugin-store"
import { toast } from "sonner"
import { listen } from "@tauri-apps/api/event"

const formSchema = z.object({
  ip: z.string().ip({ version: "v4" }),
  port: z.string().min(2)
})



const TcpForm = () => {
  const [store, setStore] = useState<Store | undefined>(undefined)


  useEffect(() => {

    getAddress()
  }, [])

  const getAddress = async () => {
    const store = await createStore('store.bin')
    console.log(store)
    setStore(store)
    const address = await store.get<{ ip: string, port: string }>('address')
    form.setValue('ip', address?.ip ?? '')
    form.setValue('port', address?.port ?? '')
  }



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ip: "",
      port: ""
    }
  })

  const handleSubmit = async ({ ip, port }: z.infer<typeof formSchema>) => {
    if (!store) throw new Error('Store not defined')
    await store.set('address', { ip: ip, port: port })
    await store.save()
    toast('Saved!')

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-sm"
      >
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                IP address for the LJ-X8002
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Port for the LJ-X8002
              </FormDescription>
            </FormItem>
          )}
        />

        <Button
          type="submit"
        >
          Save
        </Button>
      </form>

    </Form>


  )
}

export default TcpForm
