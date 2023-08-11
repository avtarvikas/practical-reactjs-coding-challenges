import { useEffect, useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'
import { pronouns } from './data/pronouns'

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

    let noOfPronouns = 0

    let usedPronouns: any = []

    lines.forEach(((line: string) => {
      if (line.length > 0) {
        validatedParagraphs.push(line)
        const wordsArray = line.trim().split(/\s+/)

        const validatedWords: any = []
        wordsArray.forEach((w) => {
          const finalWord = w.replace('!', '').replace('?', '').replace('.', '').replace(',', '').trim()

          if (pronouns.indexOf(finalWord) > -1 && usedPronouns.indexOf(finalWord) < 0) {
            usedPronouns.push(finalWord)
            noOfPronouns += 1
          }
          validatedWords.push(finalWord)

        })

        if (validatedWords.length > 0) {
          const tempLongestWord = validatedWords[0]
          if (tempLongestWord.length > longestWord.length) {
            longestWord = tempLongestWord
          }
        }

        wordCount += validatedWords.length


        const sentenceArray = line.replace("?", "|").replace(".", "|").replace("!", "|").split("|").filter((s) => s.length > 0)
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
        value: noOfPronouns,
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
