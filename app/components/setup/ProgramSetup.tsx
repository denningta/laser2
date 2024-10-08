"use client"

import DataTable from "../results/data-table"


export interface ProgramSetupProps {
  programId: string
}

const ProgramSetup = ({ programId }: ProgramSetupProps) => {

  return (
    <div>
      test
      <DataTable columns={[]} data={[]} />

    </div>
  )
}

export default ProgramSetup
