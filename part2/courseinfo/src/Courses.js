const Courses = ({ courses }) => (
  <>
    {courses.map((course) => (
      <Course course={course} key={course.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
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
  const total = parts.reduce((acc, course) => acc + course.exercises, 0);
  return (
    <>
      <strong>total of {total} exercises</strong>
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

export default Courses;