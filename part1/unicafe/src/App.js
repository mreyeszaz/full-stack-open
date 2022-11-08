import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const isFeedbackGiven = good > 0 || neutral > 0 || bad > 0;

  return (
    <>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => setGood(good + 1)} />
      <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} onClick={() => setBad(bad + 1)} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        isFeedbackGiven={isFeedbackGiven}
      />
    </>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, isFeedbackGiven }) => {
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      {isFeedbackGiven ? (
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine text="all" value={all} />
            </tr>
            <tr>
              <StatisticLine text="average" value={average} />
            </tr>
            <tr>
              <StatisticLine text="positive" value={positive.toString() + "%"} />
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <th>{text}</th>
      <th>{value}</th>
    </>

  );
};
export default App;
