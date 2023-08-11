import './index.scss'

const TextArea = ({ setValue, value }: { setValue: any, value: string }) => {

  return <textarea className="text-area" placeholder="Paste your text here..." value={value} onChange={(e) => setValue(e.target.value)} />
}

export default TextArea
