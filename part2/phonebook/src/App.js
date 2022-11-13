import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const contactsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  const clearContactFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const addContact = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      clearContactFields();
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      clearContactFields();
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactFilter
        filterText={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <ContactForm
        name={newName}
        number={newNumber}
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Contacts persons={contactsToShow} filter={newFilter} />
    </div>
  );
};

const ContactFilter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      Filter show with:
      <input type="text" value={filterText} onChange={handleFilterChange} />
    </div>
  );
};

const ContactForm = ({
  name,
  number,
  addContact,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Contacts = ({ persons }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <Contact person={person} key={person.name} />
        ))}
      </ul>
    </>
  );
};

const Contact = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

export default App;
