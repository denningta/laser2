import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export interface ConnectionStatusProps {
  icon: React.ReactNode
  form: React.ReactNode
  isConnected: boolean
}

export default function ConnectionStatus({
  icon,
  form,
  isConnected = false
}: ConnectionStatusProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <div className="relative">
            {isConnected
              ? <div className="absolute -top-1 -right-1 w-[8px] h-[8px] rounded-full bg-emerald-500"></div>
              : <div className="absolute -top-1 -right-1 w-[8px] h-[8px] rounded-full bg-destructive"></div>
            }
            {icon}
          </div>
        </Button>
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
