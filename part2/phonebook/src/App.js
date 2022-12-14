import { useEffect, useState } from "react";
import Notification from "./components/notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

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
      const person = persons.find((p) => p.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updateContact(person.id, newNumber);
      }
      clearContactFields();
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };
      personService.create(newPerson).then((res) => {
        console.log(`created contact ${newPerson.id}`);
        setNotificationMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.concat(newPerson));
      });
      clearContactFields();
    }
  };

  const updateContact = (id, phoneNumber) => {
    const person = persons.find((p) => p.id === id);
    const updatedContact = { ...person, number: phoneNumber };

    personService
      .update(id, updatedContact)
      .then((returnedPerson) => {
        setNotificationMessage(`Updated ${person.name}'s phone number`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.map((n) => (n.id !== id ? n : returnedPerson)));
      })
      .catch((err) => {
        setNotificationMessage(
          `Information of ${person.name} has already been removed from the server`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const deleteContact = (id) => {
    if (window.confirm(`Do you really want to delete contact ${id}?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      personService.del(id).then((res) => {
        console.log(`deleted contact ${id}`);
      });
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
      <Notification message={notificationMessage} />
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
      <Contacts
        persons={contactsToShow}
        filter={newFilter}
        deleteContact={deleteContact}
      />
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

const Contacts = ({ persons, deleteContact }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <Contact
            person={person}
            key={person.id}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    </>
  );
};

const Contact = ({ person, deleteContact }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deleteContact(person.id)}>delete</button>
    </li>
  );
};

export default App;
