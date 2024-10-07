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
  resultsConfig: {
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
        resultsConfig: [
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
    const { resultsConfig, separator } = config
    const values = rawString.split(separator)
    console.log(values)

    let data: Result[] = resultsConfig.reduce((acc, item, index) => {
      let group = acc.find((g) => g.id === item.id)
      if (!group) {
        group = { id: item.id }
        if (group) acc.push(group)
      }
      return acc
    }, [] as Result[])

    values.forEach((value, index) => {
      const element = data.find(g => g.id === resultsConfig[index].id)
      if (!element) return
      console.log(element, resultsConfig[index])
      const { type } = resultsConfig[index]
      if (type === "measurement") element.value = +value
      if (type === "judgement") element.judgement = value == '0' ? 'go' : 'nogo'

    })



    console.log(data)


  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )

}

export default Results
