import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({text}) => {
  return (
    <p>{text}</p>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]


  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [mostVote, setMostVote] = useState(0)

  const randomAnecdote = () => {
    const randomInt = Math.floor(Math.random() * (anecdotes.length - 0)) + 0
    return (
      setSelected(randomInt)
    )
  }

  const voteAnecdote = () => {
    const copy = [...vote]
    copy[selected] += 1
    if(vote[selected] >= vote[mostVote]){
      setMostVote(selected)
    }
    return (
      setVote(copy)
    )
  }

  return (
    <>
      <div>
        <Header text='Anecdote of the day' />
        <Display text={anecdotes[selected]} />
        <Display text={`has ${vote[selected]} votes`} />
      </div>
      <div>
        <Button handleClick={voteAnecdote} text='vote' />
        <Button handleClick={randomAnecdote} text='next anecdote' />
      </div>
      <div>
        <Header text='Anecdote with most votes' />
        <Display text={anecdotes[mostVote]} />
        <Display text={`has ${vote[mostVote]} votes`} />
      </div>
    </>
  )
}

export default App