/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import dog from "./DogIcon.png"
import "./Animal.css"

export default class AnimalList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="animalButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/animals/new")
            }
            }>
            Admit Animal
                    </button>
        </div>
        <section className="animals">
          {
            this.props.animals.map(animal =>
              <div key={animal.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <img src={dog} className="icon--dog" />
                    {animal.name}
                    <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
                    <a href="#"
                      onClick={() => this.props.deleteAnimal(animal.id)}
                      className="card-link">Delete</a>
                  </h5>
                </div>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}