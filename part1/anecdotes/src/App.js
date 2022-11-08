import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [selectedVotes, setSelectedVotes] = useState(
    Array(anecdotes.length).fill(0)
  );
  const generateRandomAnecdote = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };
  const voteForSelectedAnecdote = () => {
    const copySelectedVotes = [...selectedVotes];
    copySelectedVotes[selected] += 1;
    setSelectedVotes(copySelectedVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {selectedVotes[selected]} votes</div>
      <button onClick={voteForSelectedAnecdote}>vote</button>
      <button onClick={generateRandomAnecdote}>next anecdote</button>
      <TopAnecdote anecdotes={anecdotes} selectedVotes={selectedVotes} />
    </>
  );
};

const TopAnecdote = ({ anecdotes, selectedVotes }) => {
  const topAnecdoteIdx = selectedVotes.indexOf(Math.max(...selectedVotes));

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[topAnecdoteIdx]}</div>
      <div>has {selectedVotes[topAnecdoteIdx]} votes</div>
    </>
  );
};

export default App;
