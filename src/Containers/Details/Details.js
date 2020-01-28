import React, { Component } from 'react';
import styles from './Details.module.css';
import detailStyles from '../../Components/Detail/Detail.module.css';
import Detail from '../../Components/Detail/Detail';
import Loader from '../../Components/Loader/Loader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserDetail from '../../Components/UserDetail/UserDetail';

class Details extends Component {
    state = {
        data: this.props.personData,
        dataToDisplay: [],
        dataToSort: this.props.personData,
        count: this.props.count,
        page: 1,
        totalPage: 0,
        isLoader: true,
        filterListShow: false,
        planets: [],
        selectedplanets: [],
        searchText: ''
    }

    dataToDisplay = (data) => {
        // let page = this.state.page;
        // let data = this.state.data;
        let count = data.length;
        let personData = [];
        let pages = Math.ceil((count) / 10);
        // console.log("Pages : ", pages);
        for (let i = 0; i < pages; i++) {
            let j = 0;
            let tempData = [];
            // console.log(count);
            while (j < 10 && j < count) {
                tempData.push(data[i * 10 + j])
                j++;
            }
            count -= 10;
            personData.push({ data: tempData });
        }
        // console.log(personData[0]);
        this.setState({ dataToDisplay: personData, isLoader: false, totalPage: pages });
    }

    getPlanets = () => {
        let data = this.state.data;
        let planets = [];
        let count = this.state.count;
        for (let i = 0; i < count; i++) {
            if (!planets.includes(data[i].homeworld)) {
                planets.push(data[i].homeworld);
            }
        }
        // console.log(planets);
        this.setState({ planets: planets });
    }

    componentDidMount() {
        this.dataToDisplay(this.state.data);
        this.getPlanets();
    }

    changePage = (val) => {
        let currentPage = this.state.page;
        if (val === 1) {
            if (currentPage === this.state.totalPage || this.state.totalPage === 0) {
                return;
            }
        }
        else if (val === -1) {
            if (currentPage === 1) {
                return;
            }
        }
        this.setState({ page: currentPage + val });
    }

    onClickPersonHandler = (index) => {
        console.log("index : ", index);
    }

    sortByName = () => {
        // console.log("sorting by name");
        this.setState({ isLoader: true });
        let data = this.state.dataToSort;
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        data.sort(compare);
        // this.setState({ data: data });
        this.dataToDisplay(data);
        // console.log(data);
    }

    sortByHeight = () => {
        // console.log("sort by height");
        this.setState({ isLoader: true });
        let data = this.state.dataToSort;
        function compare(a, b) {
            if (a.height === "unknown") {
                return 1;
            }
            if (b.height === "unknown") {
                return -1;
            }
            if (Number(a.height) < Number(b.height)) {
                return -1;
            }
            if (Number(a.height) > Number(b.height)) {
                return 1;
            }
            return 0;
        }
        data.sort(compare);
        // this.setState({ data: data });
        this.dataToDisplay(data);
        // console.log(data);
    }

    onSortHandler = (event) => {
        // console.log(event.target.innerHTML);
        let sortBy = event.target.innerHTML;
        if (sortBy === "Name") {
            this.sortByName();
        }
        else if (sortBy === "Height") {
            this.sortByHeight();
        }
    }

    homeworldOnClickHandler = () => {
        let filterListShow = this.state.filterListShow;
        this.setState({ filterListShow: !filterListShow });
    }

    findCommonPeopleWithPlanet = () => {
        // console.log("finding");
        let data = this.state.data;
        let count = this.state.count;
        let toDisplay = [];
        let selectedplanets = this.state.selectedplanets;
        for (let i = 0; i < count; i++) {
            if (selectedplanets.includes(data[i].homeworld)) {
                toDisplay.push(data[i]);
            }
        }
        // console.log(toDisplay);
        this.dataToDisplay(toDisplay);
        this.setState({ dataToSort: toDisplay });
    }

    planetOnClickHandler = (event) => {
        this.setState({ page: 1 });
        // console.log(event.target.innerHTML);
        let selectedplanets = this.state.selectedplanets;
        let selectedplanet = event.target.innerHTML;
        let index = selectedplanets.indexOf(selectedplanet);
        if (index !== -1) {
            selectedplanets.splice(index, 1);
            if (selectedplanets.length === 0) {
                this.setState({ dataToSort: this.state.data });
                this.dataToDisplay(this.state.data);
            }
            else {
                this.setState({ selectedplanets: selectedplanets });
                this.findCommonPeopleWithPlanet();
            }
        }
        else {
            selectedplanets.push(selectedplanet);
            this.setState({ selectedplanets: selectedplanets });
            this.findCommonPeopleWithPlanet();
        }
        // console.log(selectedplanets);
    }

    searchHandler = (event) => {
        // console.log(event.target.value);
        if (event.keyCode === 13) {
            // console.log(this.state.searchText);
            this.setState({ page: 1 });
            let searchText = this.state.searchText.toLowerCase();
            if (searchText === "") {
                this.dataToDisplay(this.state.data);
            }
            else {
                let data = this.state.data;
                let toDisplay = [];
                let count = this.state.count;
                for (let i = 0; i < count; i++) {
                    let name = data[i].name.toLowerCase();
                    let homeworld = data[i].homeworld.toLowerCase();
                    if (name.includes(searchText, 1) || homeworld.includes(searchText, 1)) {
                        toDisplay.push(data[i]);
                    }
                }
                this.dataToDisplay(toDisplay);
            }
        }
    }

    render() {
        // console.log(this.props.personData);
        return (
            <Router>
                <Switch>
                    <Route path="/about">
                        <UserDetail /> 
                    </Route>
                    <Route path="/">
                        <div>
                            <div className={styles.taskbar}>
                                <div className={styles.tools} style={{ position: "relative" }}>
                                    <span>Filter : </span>
                                    <span className={styles.homeworld} onClick={this.homeworldOnClickHandler}>Homeworld</span>
                                    {
                                        this.state.filterListShow
                                            ?
                                            <div className={styles.worldList}>
                                                {
                                                    this.state.planets.map((planet) => (
                                                        <div className={styles.listItems} key={planet}
                                                            onClick={(event) => this.planetOnClickHandler(event)}
                                                            style={this.state.selectedplanets.includes(planet) ? { background: "#292929" } : null}>{planet}</div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                <div className={styles.tools}>
                                    <span>
                                        <input className={styles.search} type="text" placeholder="Search"
                                            onKeyUp={(event) => this.searchHandler(event)}
                                            onChange={(e) => this.setState({ searchText: e.target.value })} />
                                    </span>
                                </div>
                                <div className={styles.tools}>
                                    <span >Sort By : </span>
                                    <span className={styles.sortTag} style={{ borderRight: "2px solid grey" }}
                                        onClick={(event) => this.onSortHandler(event)} >Name</span>
                                    <span className={styles.sortTag}
                                        onClick={(event) => this.onSortHandler(event)} >Height</span>
                                </div>
                            </div>
                            {
                                this.state.isLoader
                                    ?
                                    <Loader />
                                    :
                                    <div id="personList" className={styles.container}>
                                        <div className={styles.header}>
                                            <div className={detailStyles.col}>
                                                Name
                                            </div>
                                            <div className={detailStyles.col}>
                                                Gender
                                            </div>
                                            <div className={detailStyles.col}>
                                                Height
                                            </div>
                                            <div className={detailStyles.col}>
                                                Home World
                                            </div>
                                            <div className={detailStyles.col}>
                                                Birth Year
                                        </div>
                                        </div>
                                        {
                                            this.state.totalPage === 0
                                                ?
                                                <div className={styles.notFound}>
                                                    No Data Found !!
                                                </div>
                                                :
                                                this.state.dataToDisplay[this.state.page - 1].data.map((person, index) => (
                                                    <Link to="/about" key={index}>
                                                        <Detail
                                                            OnClick={() => this.onClickPersonHandler(index)}
                                                            name={person.name}
                                                            gender={person.gender}
                                                            height={person.height}
                                                            homeworld={person.homeworld}
                                                            birthYear={person.birth_year}

                                                        />
                                                    </Link>
                                                ))
                                        }

                                        <div className={styles.pagination}>
                                            <span className={styles.pageControl} onClick={() => this.changePage(-1)}
                                                style={this.state.page === 1 ? { color: "#808080", borderColor: "#808080" } : null} >pre</span>
                                            <span className={styles.pageNumber}>{this.state.page}</span>
                                            <span className={styles.pageControl} onClick={() => this.changePage(1)}
                                                style={this.state.page === this.state.totalPage || this.state.totalPage === 0 ? { color: "#808080", borderColor: "#808080" } : null} >next</span>
                                        </div>

                                    </div>
                            }
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Details;