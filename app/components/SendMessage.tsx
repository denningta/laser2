'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { listen, UnlistenFn } from "@tauri-apps/api/event"
import { createStore } from "@tauri-apps/plugin-store"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { invoke } from "@tauri-apps/api/core"


const SendMessage = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [unlisten, setUnlisten] = useState<UnlistenFn | undefined>(undefined)

  useEffect(() => {
    listenForResponse()
  }, [])

  const sendMessage = async () => {
    const store = await createStore('store.bin')
    const address = await store.get<{ ip: string, port: string }>('address')
    if (!address || !address.ip || !address.port) {
      toast.error("No address set")
      return
    }
    const adr = address.ip + ':' + address.port
    console.log(adr)
    invoke<string>('send_message', { address: adr, message: message })
      .catch((e) => {
        console.error(e)
        toast.error('Something went wrong')
      })
  }

  const listenForResponse = async () => {
    console.log("listening...")
    const unlisten = await listen<string>('tcp-response', (event) => {
      console.log('tcp-response', event.payload)
      toast(event.payload)
    })

    setUnlisten(unlisten)
  }


  return (
    <div className="space-y-8 max-w-sm">
      <Input
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <Button onClick={() => sendMessage()}>Send</Button>

      <div>
        {response}
      </div>

    </div>
  )
}

export default SendMessage
