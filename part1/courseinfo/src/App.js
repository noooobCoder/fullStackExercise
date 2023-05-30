const Header = ({course}) => {
  return (
    <h1>{course['name']}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({course}) => {
  const parts = course['parts']
  return (
    <>
      <Part part={parts[0]['name']} exercises={parts[0]['exercises']}/>
      <Part part={parts[1]['name']} exercises={parts[1]['exercises']}/>
      <Part part={parts[2]['name']} exercises={parts[2]['exercises']}/>
    </>
  )
}

const Total = ({course}) => {
  const parts = course['parts']
  return (
    <p>Number of exercise {parts.map(item => item['exercises']).reduce((prev, cur) => prev + cur)}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App