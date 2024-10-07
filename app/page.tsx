import SendMessage from "./components/SendMessage";
import SelectProgram from "./components/SelectProgram";
import Results from "./components/results/Results";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* <SendMessage /> */}
      <SelectProgram />
      <Results />
    </div>
  );
}
