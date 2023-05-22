import {Component} from 'react'

import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial:'INITIAL'
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesList()
  }

 

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

  renderLoadingView = () =>(<div  data-testid="loader">
    <Loader type='ThreeDots' />
    </div> )

  renderFailureView = () => (
    <div className="failure-container">
      <img src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png" alt="failure view" className="failure-image" />
      <h1>Oops! Something Went Wrong</h1>
    <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type="button" onClick={this.getCoursesList } className="retry-btn">
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
