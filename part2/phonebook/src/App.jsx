import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=> {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const userExists = persons.some(person => person.name === newName)
    const numberMismatch = persons.some(person => person.name === newName && person.number !== newNumber)

    if (!userExists) {
      // Scenario 1: User doesn't exist
      personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      alert("User added successfully!")

    } else if (numberMismatch) {
    // Scenario 2: User exists, number mismatch
    const shouldReplace = window.confirm(
      `${newName} is already added to phonebook. Replace old number with new one?`
    );
    
    if (shouldReplace) {
      // Find the existing person object to get their unique ID
      const existingPerson = persons.find(person => person.name === newName)

      personService
        .update(existingPerson.id, newPerson)
        .then(updatedPerson => {
          // Map through the current state to replace ONLY the modified person
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? updatedPerson : person
          ));
          setNewName('')
          setNewNumber('')
          alert("Entry updated.")
        })
        .catch(() => {
          alert(`Failed to update ${newName}. They might have been removed from the server.`)
        })
    } else {
      alert("Update canceled.")
    }
  } 
  else {
      // Scenario 3: User exists and matches perfectly
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm (`Delete ${name}?`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        alert(`Deletion failed! '${name}' already deleted!`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h3>Phonebook</h3>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new person </h3>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App