import './index.scss'

const ResultBox = ({ resultBar }: { resultBar: any }) => {

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }: { title: string, value: string }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
