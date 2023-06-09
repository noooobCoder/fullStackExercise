const Course = ({course}) => {
  const courseName = course.name 
  const parts = course.parts
  return (
    <>
      <Header head={courseName}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

const Total = ({parts}) => {
  return <p style={{fontWeight: "bold"}}>total of {parts.map(part => part.exercises).reduce((prev, cur) => {
    console.log(prev, cur)
    return prev + cur
  })} exercises </p>
}

const Header = ({head}) => {
  return <h2>{head}</h2>
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </ul>
  )
}

const Part = ({name, exercises}) => {
  return <li>{name} {exercises}</li>
}

export default Course