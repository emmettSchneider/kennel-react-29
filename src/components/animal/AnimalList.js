import React, { Component } from 'react'


class AnimalList extends Component {
    render() {
      console.log(this.props.animals)
        return (
            <section className="animals">
            {
                this.props.animals.map(animal =>
                    <div key={animal.id}>
                        {animal.name}
                    </div>
                )
            }
            </section>
        )
    }
}

export default AnimalList