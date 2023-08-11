import { useEffect, useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App = () => {
  const [value, setValue] = useState('')
  const [longestWord, setLongestWord] = useState('');
  const [readingTime, setReadingTime] = useState(0)

  const [resultBar, setResult] = useState([
    {
      title: 'Words',
      value: 0,
    },
    {
      title: 'Characters',
      value: 0,
    },
    {
      title: 'Sentences',
      value: 0,
    },
    {
      title: 'Paragraphs ',
      value: 0,
    },
    {
      title: 'Pronouns',
      value: 0,
    },
  ])



  useEffect(() => {

    const textValue = value;

    //counting paragraphs
    let lines = textValue.split(/\r|\r\n|\n/);
    let validatedParagraphs = []
    let wordCount = 0;
    let sentenceCount = 0;
    let longestWord = ''

    lines.forEach(((line: string) => {
      if (line.length > 0) {
        validatedParagraphs.push(line)
        const wordsArray = line.split(" ").filter((w) => w.length > 1).sort((a, b) => b.length - a.length);


        if (wordsArray.length > 0) {
          const tempLongestWord = wordsArray[0].replace('!', '').replace('?', '').replace('.', '').replace(',', '')
          if (tempLongestWord.length > longestWord.length) {
            longestWord = tempLongestWord
          }
        }

        wordCount += wordsArray.length


        const sentenceArray = line.split("[?!.]+")
        sentenceCount += sentenceArray.length
      }
    }));


    setLongestWord(longestWord);



    let totalReadingTime = (60 / 225 * wordCount) / 60

    setReadingTime(Math.floor(totalReadingTime))



    setResult(
      [{
        title: 'Words',
        value: wordCount,
      },
      {
        title: 'Characters',
        value: textValue.length,
      },
      {
        title: 'Sentences',
        value: sentenceCount,
      },
      {
        title: 'Paragraphs ',
        value: validatedParagraphs.length,
      },
      {
        title: 'Pronouns',
        value: 0,
      }]
    )
  }, [value])
  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox resultBar={resultBar} />
          <TextArea setValue={setValue} value={value} />
          <BottomResultBox longestWord={longestWord} readingTime={readingTime} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
