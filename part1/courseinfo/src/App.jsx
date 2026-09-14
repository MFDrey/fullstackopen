const Header = ({courseName}) => {
  console.log(courseName)
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({courseParts}) => {
  console.log(courseParts)
  console.log(courseParts[0].exercises)
  return (
    <div>
      <p>{courseParts[0].name} exercises={courseParts[0].exercises}</p>
      <p>{courseParts[1].name} exercises={courseParts[1].exercises}</p>
      <p>{courseParts[2].name} exercises={courseParts[2].exercises}</p>
    </div>
  )
}

const Total = ({courseParts}) => {
  console.log(courseParts)
  return (
    <p>Number of exercises {courseParts[0].exercises + courseParts[1].exercises + courseParts[2].exercises}</p>
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
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  )
}

export default App