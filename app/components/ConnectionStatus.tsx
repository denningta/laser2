import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";

export interface ConnectionStatusProps {
  icon: React.ReactNode
  form: React.ReactNode
  isConnected: boolean
  tooltip?: React.ReactNode
}

export default function ConnectionStatus({
  icon,
  form,
  isConnected = false,
  tooltip
}: ConnectionStatusProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <div className="relative">
                {isConnected
                  ? <div className="absolute -top-1 -right-1 w-[8px] h-[8px] rounded-full bg-emerald-500"></div>
                  : <div className="absolute -top-1 -right-1 w-[8px] h-[8px] rounded-full bg-destructive"></div>
                }
                {icon}
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end" alignOffset={32} side="left">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  )

}
