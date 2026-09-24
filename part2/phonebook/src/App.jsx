import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    persons.some(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) :
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h3>Phonebook</h3>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new person </h3>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons} />
    </div>
  )
}

export default App