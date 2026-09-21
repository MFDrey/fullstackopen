const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total total={course} />
        </div>
      ))}
    </div>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ course }) => (
  console.log(course),
  <div>
    {course.parts.map(part => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ))}
  </div>
);

const Total = ({ total }) => {
  const totalExercises = total.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return <p><b>Total of {totalExercises} exercises</b></p>;
};

export default Course;