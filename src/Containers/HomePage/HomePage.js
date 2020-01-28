import React, { Component } from 'react';
import Loader from '../../Components/Loader/Loader';
import Banner from '../../Components/Banner/Banner';
import Details from '../Details/Details';
import axios from 'axios';

class HomePage extends Component {
    state = {
        data: [],
        isDataLoad: false,
        count: 0
    }

    loaderHandler = (lodarState)=> {
        this.setState({isDataLoad: lodarState})
    }

    setHomeWorld = () => {
        let root = this;
        let personData = [];
        let promises = [];
        let person = this.state.data[0];
        axios(person.homeworld)
            .then(response => {
                person.homeworld = response.data.name;
                personData.push(person);
                return root.state.count;
            }).then((count) => {
                // let data
                for (let i = 1; i < count; i++) {
                    // console.log("data:", root.state.data[i]);
                    person = root.state.data[i];
                    promises.push(axios(person.homeworld));
                }
                return Promise.all(promises);
            })
            .then(response => {
                // console.log("ner", response);
                let count = response.length;
                // console.log(count);
                for (let i = 0; i < count; i++) {
                    // console.log("data:", response[i]);
                    person = root.state.data[i+1];
                    person.homeworld = response[i].data.name;
                    personData.push(person);
                }
                root.setState({
                    data: personData,
                    isDataLoad: true
                })
            })
    }

    getAllStarwarsPeople = () => {
        let root = this;
        let people = [];

        axios("https://swapi.co/api/people/")
            .then(response => {
                people = response.data.results;
                root.setState({ count: response.data.count });
                return response.data.count;
            })
            .then(count => {
                const numberOfPagesLeft = Math.ceil((count - 1) / 10);
                let promises = [];
                for (let i = 2; i <= numberOfPagesLeft; i++) {
                    promises.push(axios(`https://swapi.co/api/people?page=${i}`));
                }
                return Promise.all(promises);
            })
            .then(response => {
                // console.log("respose", response);
                people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
                root.setState({
                    data: people,
                })
                root.setHomeWorld();
                return people;
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getAllStarwarsPeople();
    }

    render() {
        return (
            <div>
                <Banner />
                {this.state.isDataLoad ?
                    <Details
                        personData={this.state.data} 
                        count={this.state.count} />
                    :
                    <Loader />
                }
            </div>
        );
    }
}

export default HomePage;