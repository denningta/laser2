import Image from "next/image";
import SendMessage from "./components/SendMessage";
import TcpForm from "./components/TcpForm";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="p-6 space-y-10">
      <SendMessage />

    </div>
  );
}
