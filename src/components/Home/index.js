import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Loader} from 'react-loader-spinner'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getCoursesList()
  }

  onClickRetry = () => <Redirect to="/" />

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchData = await response.json()
      console.log(fetchData)

      const updatedData = fetchData.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseList} = this.state

    return (
      <div className="home-container">
        <h1 className="title">Courses</h1>
        <ul className="courses-cont">
          {courseList.map(eachCourse => (
            <CourseItem key={eachCourse.id} courseItem={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => <Loader data-testid="loader" />

  renderFailureView = () => (
    <div className="failure-container">
      <img src="" alt="failure view" className="failure-image" />
      <div>
        <button type="button" onClick={this.onClickRetry} className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.isProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Home
