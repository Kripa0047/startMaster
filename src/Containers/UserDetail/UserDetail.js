import React, { Component } from 'react';
import Detail from '../../Components/UserDetail/UserDetail';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';

class UserDetail extends Component {
    state = {
        data: this.props.detail,
        isLoader: true,
        films: [],
        species: '',
        vehicles: [],
        starships: []
    }

    loaderCheck = () => {
        if (this.state.films.length !== 0 && this.state.species !== '' && this.state.vehicles.length !== 0 && this.state.starships.length !== 0) {
            this.setState({ isLoader: false });
            // console.log(this.state);
        }
    }

    findFilms = () => {
        // console.log(this.state.data.films);
        let films = [];
        let filmURLs = this.state.data.films;
        let len = filmURLs.length;
        let root = this;
        if (len === 0) {
            films.push("None");
        }
        else {
            for (let i = 0; i < len; i++) {
                axios(filmURLs[i])
                    .then(response => {
                        // console.log(response);
                        films.push(response.data.title);
                        root.loaderCheck();
                    })
            }
            // console.log(films);
        }
        this.setState({ films: films });
    }

    findSpecies = () => {
        // console.log(this.state.data.species);
        let root = this;
        let speciesURL = this.state.data.species;
        if (speciesURL.length === 0) {
            this.setState({ species: "None" });
        }
        else {
            axios(speciesURL[0])
                .then(response => {
                    // console.log(response);
                    this.setState({ species: response.data.name });
                    root.loaderCheck();
                })
        }
    }

    findVehicles = () => {
        let vehiclesURLs = this.state.data.vehicles;
        let len = vehiclesURLs.length;
        let vehicles = [];
        let root = this;
        if (len === 0) {
            vehicles.push("None");
        }
        else {
            for (let i = 0; i < len; i++) {
                axios(vehiclesURLs[i])
                    .then(response => {
                        // console.log(response);
                        vehicles.push(response.data.name);
                        root.loaderCheck();
                    })
            }
        }
        this.setState({ vehicles: vehicles });
    }

    starships = () => {
        let starshipsURLs = this.state.data.starships;
        let len = starshipsURLs.length;
        let starships = [];
        let root = this;
        if (len === 0) {
            starships.push("None");
        }
        else {
            for (let i = 0; i < len; i++) {
                axios(starshipsURLs[i])
                    .then(response => {
                        // console.log(response);
                        starships.push(response.data.name);
                        root.loaderCheck();
                    })
            }
        }
        this.setState({ starships: starships });
    }

    componentDidMount() {
        this.findFilms();
        this.findSpecies();
        this.findVehicles();
        this.starships();
    }

    render() {
        // console.log(this.state.data);
        return (
            this.state.isLoader
                ?
                <Loader />
                :
                <Detail
                    detail={this.state.data}
                    films={this.state.films}
                    species={this.state.species}
                    vehicles={this.state.vehicles}
                    starships={this.state.starships} />
        );
    }
}

export default UserDetail;