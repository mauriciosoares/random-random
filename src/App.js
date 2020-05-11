import React from 'react';
import boilerplates from './boilerplates'

function randomizeArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

class App extends React.Component {
  interval = null
  constructor() {
    super()
    let state = {
      characters: [],
      timer: 1,
      isRunning: false,
      displayedCharacter: '',
      isTicking: false,
    }

    const cache = window.localStorage.getItem('cache')
    if (cache) {
      state = JSON.parse(cache)
    }

    this.state = state
  }

  componentDidMount() {
    const cache = window.localStorage.getItem('cache')

    if (cache) {
      this.setState(JSON.parse(cache))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { characters, timer } = this.state
    if (
      prevState.characters !== characters ||
      prevState.timer !== timer
    ) {
      window.localStorage.setItem('cache', JSON.stringify(this.state))
    }
  }

  updateCharacter = async () => {
    const { characters, displayedCharacter, timer } = this.state
    let randomCharacter = randomizeArray(characters);

    if (characters.length > 1) {
      while (randomCharacter === displayedCharacter) {
        randomCharacter = randomizeArray(characters)
      }
    }

    this.setState({
      displayedCharacter: randomCharacter,
      isTicking: true,
    })

    setTimeout(() => {
      const progressBar = document.getElementById('progress-bar')
      progressBar.style.setProperty('transition', `${timer}s linear`)
      progressBar.style.setProperty('width', `0`)
    }, 30)

    window.setTimeout(() => this.setState({ isTicking: false, }), 100)
  }

  start = () => {
    const { timer } = this.state
    this.setState({
      isRunning: true,
    }, () => {
      this.updateCharacter()
      this.interval = window.setInterval(() => {
        this.updateCharacter()
      }, timer * 1000)
    })

  }

  stop = () => {
    window.clearInterval(this.interval)
    this.setState({
      isRunning: false,
    })
  }

  render() {
    const { timer, isRunning, displayedCharacter, characters, isTicking } = this.state
    const parsedCharacters = characters.join(', ')

    return (
      <div>
        <h1 className="title">Random Random</h1>

        {!isRunning &&
          <>
            <input
              key={parsedCharacters}
              defaultValue={parsedCharacters}
              onChange={(e) => {
                this.setState({
                  characters: [...new Set(e.target.value.split(',').map(value => value.trim()).filter(Boolean))]
                })
              }}
              className="characters input"
              placeholder="Characters to Randomize"
              type="text" />

            <input
              defaultValue={timer}
              onChange={(e) => {
                this.setState({
                  timer: parseInt(e.target.value, 10) || 0,
                })
              }}
              className="interval input"
              placeholder="Interval in Seconds"
              type="number" />
            <button className="button start" onClick={this.start} disabled={characters.length <= 1 || timer < 1}>START</button>

            <h2>Boilerplates</h2>
            <ul className="boilerplate">
              {boilerplates.map(item => (
                <li key={item.name} onClick={() => this.setState({ characters: item.value })}>
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        }
        {isRunning &&
          <>
            <div className={`displayed-character ${isTicking ? 'tick' : ''}`}>
              {displayedCharacter}
            </div>

              <div
                key={displayedCharacter}
                id="progress-bar"
                className="progress-bar"
                ref={(element) => {this.progressBar = element}} />

            <button className="button stop" onClick={this.stop}>STOP</button>
          </>
        }
      </div>
    );
  }
}

export default App;
