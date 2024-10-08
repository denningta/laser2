import { List, Microchip, PcCase, SlidersHorizontal } from "lucide-react"
import ConnectionStatus from "./ConnectionStatus"
import TcpForm from "./TcpForm"
import SerialForm from "./SerialForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
        tooltip={"LJ-X8002 settings"}
      />
      <ConnectionStatus
        icon={<Microchip />}
        isConnected={false}
        form={<SerialForm />}
        tooltip={"ClearPath servo settings"}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/settings">
            <Button variant="ghost"><List /></Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent align="end" alignOffset={32} side="left">
          Inspection program settings
        </TooltipContent>
      </Tooltip>

      <div className="grow"></div>


    </div>
  )
}
