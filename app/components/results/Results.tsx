"use client"

import { useEffect, useState } from "react"
import { columns, Result } from "./columns"
import DataTable from "./data-table"


export interface ResultsConfig {
  resultsConfig: {
    id: number
    type: string
  }[],
  separator: ","
}

const Results = () => {
  const [data, setData] = useState<Result[]>([])

  useEffect(() => {
    convertResponse(
      "0,0.259,0,0.261,0,0.258,0,0.260,0,0.260",
      {
        resultsConfig: [
          { id: 0, type: "judgement" },
          { id: 0, type: "measurement" },
          { id: 1, type: "judgement" },
          { id: 1, type: "measurement" },
          { id: 2, type: "judgement" },
          { id: 2, type: "measurement" },
          { id: 3, type: "judgement" },
          { id: 3, type: "measurement" },
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

    let data: Result[] = resultsConfig.reduce((acc, item) => {
      let group: any = acc.find((g) => g.id === item.id)
      if (!group) {
        group = { id: item.id }
        if (group) acc.push(group)
      }
      return acc
    }, [] as Result[])

    values.forEach((value, valueIndex) => {
      const config = resultsConfig[valueIndex]
      if (!config) return
      const dataIndex = data.findIndex((el) => el.id === config.id)
      if (config.type === "judgement") data[dataIndex].judgement = value == '0' ? 'go' : 'nogo'
      if (config.type === "measurement") data[dataIndex].value = +value
    })

    setData(data)
  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )

}

export default Results
