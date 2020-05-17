import React from 'react';
import boilerplates from './boilerplates'
import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

function formatTimer(ml) {
  var minutes = Math.floor(ml / 60000);
  var seconds = ((ml % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function randomizeArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

class App extends React.Component {
  interval = null
  constructor() {
    super()
    let state = {
      characters: [],
      interval: 1,
      minutes: 1,
      seconds: 0,
      timeout: 0,
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
    const { characters, interval, minutes, seconds } = this.state
    if (
      prevState.characters !== characters ||
      prevState.interval !== interval ||
      prevState.minutes !== minutes ||
      prevState.seconds !== seconds
    ) {
      window.localStorage.setItem('cache', JSON.stringify(this.state))
    }
  }

  updateCharacter = async () => {
    const { characters, displayedCharacter, interval } = this.state
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
      progressBar.style.setProperty('transition', `${interval}s linear`)
      progressBar.style.setProperty('width', `0`)
    }, 30)

    window.setTimeout(() => this.setState({ isTicking: false, }), 100)
  }

  start = () => {
    const { interval, minutes, seconds } = this.state
    const timeoutMl = (minutes * 60 * 1000) + (seconds * 1000)
    this.setState({
      timeout: timeoutMl,
    })

    noSleep.enable()

    this.setState({
      isRunning: true,
    }, () => {
      this.updateCharacter()
      this.interval = window.setInterval(() => {
        this.updateCharacter()
      }, interval * 1000)

      this.timeout = window.setInterval(() => {
        const { timeout } = this.state
        this.setState({
          timeout: timeout - 1000,
        })

        if ((timeout - 1000) === 0) {
          this.stop()
        }
      }, 1000)
    })

  }

  stop = () => {
    window.clearInterval(this.interval)
    window.clearInterval(this.timeout)
    noSleep.disable()
    this.setState({
      isRunning: false,
    })
  }

  render() {
    const { interval, isRunning, displayedCharacter, characters, isTicking, minutes, seconds, timeout } = this.state
    const parsedCharacters = characters.join(', ')

    return (
      <div>
        <h1 className="title">Random Random</h1>

        {!isRunning &&
          <>
            <label>Characters to Randomize</label>
            <input
              key={parsedCharacters}
              defaultValue={parsedCharacters}
              onChange={(e) => {
                this.setState({
                  characters: [...new Set(e.target.value.split(',').map(value => value.trim()).filter(Boolean))]
                })
              }}
              className="input"
              type="text" />

            <label>Interval <i>(in seconds)</i></label>
            <input
              defaultValue={interval}
              onChange={(e) => {
                this.setState({
                  interval: parseInt(e.target.value, 10) || 0,
                })
              }}
              className="input"
              placeholder="Interval in Seconds"
              type="number" />

            <div className="input-group">
              <label style={{ width: '50%' }}>Minutes</label>
              <label style={{ width: '50%' }}>Seconds</label>
            </div>
            <div className="input-group">
              <input
                defaultValue={minutes}
                onChange={(e) => {
                  this.setState({
                    minutes: parseInt(e.target.value, 10) || 0,
                  })
                }}
                className="input"
                placeholder="Timer Minutes"
                type="number" />
              <input
                defaultValue={seconds}
                onChange={(e) => {
                  this.setState({
                    seconds: parseInt(e.target.value, 10) || 0,
                  })
                }}
                className="input"
                placeholder="Timer Seconds"
                type="number" />
            </div>
            <button className="button start" onClick={this.start} disabled={characters.length <= 1 || interval < 1}>START</button>

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
              ref={(element) => { this.progressBar = element }} />


            <div className="timeout">
              {formatTimer(timeout)}
            </div>

            <button className="button stop" onClick={this.stop}>STOP</button>
          </>
        }
      </div>
    );
  }
}

export default App;
