'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { listen } from "@tauri-apps/api/event"
import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const SendMessage = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')



  return (
    <div className="space-y-8 max-w-sm">
      <Input
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <Button>Send</Button>

      <div>
        {response}
      </div>

    </div>
  )
}

export default SendMessage
