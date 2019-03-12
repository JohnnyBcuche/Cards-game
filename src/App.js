import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor() {
  super()
  this.state = { deck_id:'', image:'', value:'', result:'' }
}

componentDidMount() {     
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')       
  .then(response => response.json())       
  .then(data => this.setState({ deck_id:data.deck_id }))
  .then(this.upButton)
  .then(this.downButton)
}

upButton = () => { 
  var prevCard = this.state.value;
  fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)       
  .then(response => response.json())       
  .then(data => data.cards.map(card => {
    switch (card.value) {
    case '0': 
    card.value = '10';
    break;
    case 'ACE': 
    card.value = '11';
    break;
    case 'JACK': 
    card.value = '12';
    break;
    case 'QUEEN': 
    card.value = '13';
    break;
    case 'KING': 
    card.value = '14';
    break;
  }
  card.value = parseInt(card.value, 10);
   this.setState({image:card.image, value:card.value})
    console.log(card.value +' = '+ this.state.value )
    if (prevCard < this.state.value) {
      console.log('win')
      document.getElementById("winner").innerHTML = "Win (" + prevCard + " < " + card.value + ")"
    } else if (prevCard == this.state.value){
      console.log('equal')
      document.getElementById("winner").innerHTML = "Draw (" + prevCard + " = " + card.value + ")"
    }
    else {
      console.log('lose')
      document.getElementById("winner").innerHTML = "Lose (" + prevCard + " < " + card.value + ")"
    }
  })
  )
}

downButton = () => { 
  var prevCard = this.state.value;
  fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)       
  .then(response => response.json())       
  .then(data => data.cards.map(card => {
    switch (card.value) {
    case '0': 
    card.value = '10';
    break;
    case 'ACE': 
    card.value = '11';
    break;
    case 'JACK': 
    card.value = '12';
    break;
    case 'QUEEN': 
    card.value = '13';
    break;
    case 'KING': 
    card.value = '14';
    break;
  }
  card.value = parseInt(card.value, 10);
   this.setState({image:card.image, value:card.value})
    console.log(card.value +' = '+ this.state.value )
    if (prevCard > this.state.value) {
      console.log('win')
      document.getElementById("winner").innerHTML = "Win (" + prevCard + " > " + card.value + ")"
    } else if (prevCard == this.state.value){
      console.log('equal')
      document.getElementById("winner").innerHTML = "Draw (" + prevCard + " = " + card.value + ")"
    }
    else {
      console.log('lose')
      document.getElementById("winner").innerHTML = "Lose (" + prevCard + " > " + card.value + ")"
    }
  })
  )
}

  render() {
    return (
      <div className="App" >
        <button onClick={this.upButton} className="button">Up</button>
        <button onClick={this.downButton} className="button">Down</button>
        <h1 id="winner"></h1> 
        <img className="" src={this.state.image} alt="" />
      </div>
    );
  }
}

export default App;
