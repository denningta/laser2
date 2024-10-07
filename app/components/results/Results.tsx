"use client"

import { useEffect } from "react"
import { columns, Result } from "./columns"
import DataTable from "./data-table"


const data: Result[] = [
  {
    id: 1,
    value: 0.268,
    judgement: 'go'
  },
  {
    id: 2,
    value: 0.271,
    judgement: 'nogo'
  },
  {
    id: 3,
    value: 0.267,
    judgement: 'go'
  }
]

export interface ResultsConfig {
  results: {
    id: number
    type: string
  }[],
  separator: ","
}

const Results = () => {
  useEffect(() => {
    convertResponse(
      "0,0.259,0,0.261,0,0.258,0,0.260,0,0.260",
      {
        results: [
          { id: 0, type: "judgement" },
          { id: 0, type: "measurement" },
          { id: 1, type: "judgement" },
          { id: 1, type: "measurement" },
        ],
        separator: ","
      },
    )

  }, [])

  const convertResponse = (
    rawString: string,
    config: ResultsConfig
  ) => {
    const { results, separator } = config
    const values = rawString.split(separator)
    console.log(values)

    let data = []
    let resultId = results[0].id


  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )

}

export default Results
