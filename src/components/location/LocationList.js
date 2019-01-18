import React, { Component } from 'react'


class LocationList extends Component {
    render() {
      console.log(this.props.locations)
        return (
            <section className="locations">
            {
                this.props.locations.map(location =>
                    <div key={location.id}>
                        <h4>{location.name}</h4>
                        <p>{location.address}</p>
                    </div>
                )
            }
            </section>
        )
    }
}

export default LocationList