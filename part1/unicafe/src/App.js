import { useState } from 'react'

const Header = ({content}) => {
  return (
    <h1>{content}</h1>
  )
}

const Display = ({text, number}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if(all === 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <Display text={'good'} number={good} />
      <Display text={'neutral'} number={neutral} />
      <Display text={'bad'} number={bad} />
      <Display text={'all'} number={all} />
      <Display text={'average'} number={(good - bad) / all} />
      <Display text={'positive'} number={`${good / all * 100} %`} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const headContent1 = 'give feedback'
  const headContent2 = 'statistics'

  const handleClick = (response) => {
    let [responseFunc, count] = [NaN, 0]
    if(response === 'good'){
      responseFunc = setGood
      count = good
    }else if(response === 'neutral'){
      responseFunc = setNeutral
      count = neutral
    }else if(response === 'bad'){
      responseFunc = setBad
      count = bad
    }
    return (
      () => {
        responseFunc(count+1)
        setAll(all+1)
      }
    )
  }


  return (
    <>
      <div>
        <Header content={headContent1}/>
        <Button handleClick={handleClick('good')} text='good' />
        <Button handleClick={handleClick('neutral')} text='neutral' />
        <Button handleClick={handleClick('bad')} text='bad' />
      </div>
      <div>
        <Header content={headContent2}/>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </div>
    </>
  )
}

export default App