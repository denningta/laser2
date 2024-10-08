import SendMessage from "./components/SendMessage";
import SelectProgram from "./components/SelectProgram";
import Results from "./components/results/Results";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* <SendMessage /> */}
      <SelectProgram />
      <Results />
      <Footer />
    </div>
  );
}
