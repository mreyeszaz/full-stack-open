const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((p) => (
        <Part part={p.name} exercise={p.exercises} key={p.name + p.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const exercises = parts.map((p) => p.exercises);
  let count = 0;
  exercises.forEach((e) => (count += e));
  return (
    <>
      <p>Number of exercises {count}</p>
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

export default App;
