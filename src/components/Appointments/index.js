// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleVal: '',
    dateVal: '',
    apps: [],
    starFolderClickedStatus: false,
  }

  titleChange = event => {
    this.setState({titleVal: event.target.value})
  }

  dateChange = event => {
    this.setState({dateVal: event.target.value})
  }

  buttonClicked = event => {
    event.preventDefault()
    const {titleVal, dateVal} = this.state
    const newItem = {
      id: v4(),
      titleVal,
      dateVal,
      isStarred: false,
    }
    this.setState(prev => ({
      apps: [...prev.apps, newItem],
      titleVal: '',
      dateVal: '',
    }))
  }

  starred = id => {
    this.setState(prev => ({
      apps: prev.apps.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  starFolderClicked = () => {
    this.setState(prev => ({
      starFolderClickedStatus: !prev.starFolderClickedStatus,
    }))
  }

  render() {
    const {titleVal, dateVal, apps, starFolderClickedStatus} = this.state

    const resultlist = apps.filter(each => each.isStarred === true)
    console.log(resultlist)

    return (
      <div className="main-container">
        <div className="card">
          <div className="top-part">
            <form className="text-part">
              <h1>Add Appointment</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                onChange={this.titleChange}
                value={titleVal}
              />
              <label htmlFor="date" className="title">
                DATE
              </label>
              <input
                type="date"
                id="date"
                onChange={this.dateChange}
                value={dateVal}
              />
              <button
                type="submit"
                className="button"
                onClick={this.buttonClicked}
              >
                Add
              </button>
            </form>
            <div className="image-part">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="main-image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottom-part">
            <div className="app-star">
              <h1>Appointments</h1>
              <button
                className="starred-folder"
                type="button"
                onClick={this.starFolderClicked}
              >
                Starred
              </button>
            </div>
            <ul className="items-container">
              {starFolderClickedStatus
                ? resultlist.map(each => (
                    <AppointmentItem
                      details={each}
                      key={each.id}
                      starred={this.starred}
                    />
                  ))
                : apps.map(each => (
                    <AppointmentItem
                      details={each}
                      key={each.id}
                      starred={this.starred}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
