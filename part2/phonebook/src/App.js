import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notifications'
import './index.css'

const Filter = ({value, filterChange}) => {
  return (
    <form>
      <div>
        filter shown with: <input value={value} onChange={filterChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({onSubmit, nameValue, numberValue, nameChange, numberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameChange}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberChange}/>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Person = ({person, deletePerson}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  // const [updateMessage, setUpdateMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPerson => {
      setPersons(initialPerson)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const filterPersons = persons.filter(person => {
    let regex = new RegExp(newFilter, 'i')
    return regex.test(person.name)
  })

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const previousPerson = persons.find(p => p.name === newName)
        personService.update(previousPerson.id, {...previousPerson, number: newNumber}).then(updatedPerson => {
          setPersons(persons.map(person => person.name === newName ? updatedPerson : person))
          setErrorMessage(`Updated ${newName}`)
        }).catch(error => {
          console.log(error)
          setErrorMessage('???')
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons([...persons, returnedPerson])
      setErrorMessage(`Added ${personObject.name}`)
      setNewName('')
      setNewNumber('')
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const deletePersonOf = (name, id) => {
    if(window.confirm(`Delete ${name} ?`)){
      personService.remove(id).then(() => {
        setPersons(persons.filter(n => n.id !== id))
        setErrorMessage(`Delete ${name}`)
        setNewName("")
        setNewNumber("")
      }).catch(error => {
        console.log(error)
        setErrorMessage(`Infomation of ${name} has already been removed from server`)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter value={newFilter} filterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {filterPersons.map(person => <Person key={person.id} person={person} deletePerson={() => deletePersonOf(person.name, person.id)}/>)}
      </ul>
    </div>
  )
}

export default App