import { Microchip, PcCase } from "lucide-react"
import ConnectionStatus from "./ConnectionStatus"
import TcpForm from "./TcpForm"
import SerialForm from "./SerialForm"

export interface SidebarProps {
  children: React.ReactNode
}
export default function Sidebar() {

  return (
    <div className="absolute right-0 top-0 bg-accent h-full w-[80px] p-3 pt-7 flex flex-col items-center space-y-7">
      <ConnectionStatus
        icon={<PcCase />}
        isConnected={false}
        form={<TcpForm />}
      />
      <ConnectionStatus
        icon={<Microchip />}
        isConnected={false}
        form={<SerialForm />}
      />
      <div className="grow"></div>


    </div>
  )
}
