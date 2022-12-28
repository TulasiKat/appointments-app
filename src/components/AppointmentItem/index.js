// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

class AppointmentItem extends Component {
  state = {star: false}

  starClicked = () => {
    const {starred, details} = this.props
    const {id} = details
    this.setState(prev => ({star: !prev.star}))
    starred(id)
  }

  render() {
    const {details} = this.props
    const {titleVal, dateVal} = details
    const {star} = this.state

    return (
      <li className="item">
        <div className="item-top">
          <p className="item-heading">{titleVal}</p>
          <button type="button">
            <img
              src={
                star
                  ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
              }
              alt="star"
              className="star"
              onClick={this.starClicked}
            />
          </button>
        </div>
        <p className="date-para">
          Date: {format(new Date(dateVal), 'dd MMMM yyyy, EEEE')}
        </p>
      </li>
    )
  }
}

export default AppointmentItem
