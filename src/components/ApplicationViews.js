import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import AnimalManager from '../modules/AnimalManager'
import Login from './authentication/Login'
import SearchResults from './search/SearchResults'


export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: [],
    locations: [],
    owners: []
  };

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem('credentials') !== null

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(r => r.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };

  addAnimal = (animal) => AnimalManager.post(animal)
    .then(() => AnimalManager.getAll())
    .then(animals => this.setState({
      animals: animals
    })
    )

  componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => newState.animals = animals)
      .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
      .then(employees => newState.employees = employees)
      .then(() => fetch("http://localhost:5002/locations")
        .then(r => r.json()))
      .then(locations => newState.locations = locations)
      .then(() => fetch("http://localhost:5002/owners")
        .then(r => r.json()))
      .then(owners => newState.owners = owners)
      .then(() => this.setState(newState))
  }


  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route exact path="/animals" render={(props) => {
          return <AnimalList {...props}
            deleteAnimal={this.deleteAnimal}
            animals={this.state.animals} />
        }} />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
            addAnimal={this.addAnimal}
            employees={this.state.employees} />
        }} />
        <Route path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route exact path="/employees" render={props => {
          if (this.isAuthenticated()) {
            return <EmployeeList deleteEmployee={this.deleteEmployee}
              employees={this.state.employees} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnerList owners={this.state.owners} />
        }} />
        <Route path="/search" render={props => {
          return (<SearchResults {...this.props} />);
        }}
        />
      </React.Fragment>
    )
  }
}