import ProgramSetup from "@/app/components/setup/ProgramSetup";

export async function generateStaticParams() {
  const programs = ["1", "2", "3", "4", "5", "6"]

  return programs.map((prg) => ({
    id: prg,
  }))
}

export default function Program({ params }: { params: { id: string } }) {
  return (
    <div>
      <ProgramSetup programId={params.id} />
    </div>

  )

}

