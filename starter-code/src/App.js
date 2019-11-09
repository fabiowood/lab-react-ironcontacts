/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json';
import FirstCelebs from './components/FirstCelebs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: contacts.filter((celeb, index) => index <= 4),
      allContacts: contacts,
    };
    this.addRandomCeleb = this.addRandomCeleb.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
    this.getAllCelebrities = this.getAllCelebrities.bind(this);
    // this.deleteCelebrity = this.deleteCelebrity.bind(this);
  }

  getAllCelebrities() {
    const allContactsCopy = [...this.state.allContacts];
    this.setState({
      contacts: allContactsCopy,
    });
  }

  defineCelebNumber() {
    return Math.floor(Math.random() * this.state.allContacts.length);
  }

  addRandomCeleb() {
    const allContactsCopy = [...this.state.allContacts];
    const contactsCopy = [...this.state.contacts];
    const randomIndex = this.defineCelebNumber();
    let randomCelebrity = allContactsCopy[randomIndex];
    while (contactsCopy.indexOf(randomCelebrity) !== -1) {
      randomCelebrity = allContactsCopy[randomIndex];
    }
    contactsCopy.push(randomCelebrity);
    this.setState({
      contacts: contactsCopy,
    });
  }

  sortByName() {
    const contactsCopy = [...this.state.contacts];
    const sortedByNameCelebs = contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      contacts: sortedByNameCelebs,
    });
  }

  sortByPopularity() {
    const contactsCopy = [...this.state.contacts];
    const sortedByPopularityCelebs = contactsCopy.sort((a, b) => b.popularity - a.popularity);
    this.setState({
      contacts: sortedByPopularityCelebs,
    });
  }

  deleteCelebrity(index) {
    const contactsCopy = [...this.state.contacts];
    contactsCopy.splice(index, 1);
    this.setState({
      contacts: contactsCopy,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Iron Celebrities</h1>
        </header>
        <section className="button-section">
          <button type="submit" className="button is-black is-rounded buttons-adjust" onClick={this.addRandomCeleb}>Add Random Celebrity</button>
          <button type="submit" className="button is-dark is-rounded buttons-adjust" onClick={this.sortByName}>Sort By Name</button>
          <button type="submit" className="button is-light is-rounded buttons-adjust" onClick={this.sortByPopularity}>Sort By Popularity</button>
          <button type="submit" className="button is-info is-rounded buttons-adjust" onClick={this.getAllCelebrities}>All Celebrities!</button>
        </section>
        <table className="table is-striped table-adjust">
          <thead>
            <tr>
              <th>Picture</th>
              <th className="th-adjust">Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
          this.state.contacts.map((celeb, index) => {
            return <FirstCelebs key={index} {...celeb} clickToDelete={() => this.deleteCelebrity(index)} />;
          })
        }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
