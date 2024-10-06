import SendMessage from "./components/SendMessage";
import DataTable from "./components/results/data-table";
import { columns } from "./components/results/columns";

export default function Home() {
  return (
    <div className="space-y-10">
      <SendMessage />
      <DataTable data={[]} columns={columns} />

    </div>
  );
}
