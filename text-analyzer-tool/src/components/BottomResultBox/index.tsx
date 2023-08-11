import { useEffect, useState } from 'react'
import './index.scss'

const BottomResultBox = ({ longestWord, readingTime }: { longestWord: string, readingTime: number }) => {

  const [bottomResultBar, setBottomResultBar] = useState([
    {
      title: 'Average Reading Time:',
      value: '-',
    },
    {
      title: 'Longest word:',
      value: '-',
    },
  ])

  useEffect(() => {
    setBottomResultBar([
      {
        title: 'Average Reading Time:',
        value: (readingTime + 1).toString(),
      },
      {
        title: 'Longest word:',
        value: longestWord,
      },
    ])
  }, [longestWord, readingTime])

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
