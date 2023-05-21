import {Component} from 'react'
import {Loader} from 'react-loader-spinner'

import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseDetailApiView extends Component {
  state = {courseDetails: {}, apiStatus2: apiStatusConst.initial}

  componentDidMount() {
    this.getCourseDetailView()
  }

 

  getCourseDetailView = async () => {
     this.setState({apiStatus2: apiStatusConst.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

   
    const url2 = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

   
    const response = await fetch(url2, options)
    
    

    if (response.ok) {
      const fetchData = await response.json()
      const data = fetchData.course_details
      const updatedData = {
        description: data.description,
        id: data.id,
        name: data.name,

        imageUrl: data.image_url,
      }

      console.log(updatedData)

      this.setState({
        courseDetails: updatedData,
        apiStatus2: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus2: apiStatusConst.failure})
    }
  }

  renderCourseSuccessView = () => {
    const {courseDetails} = this.state
    console.log(courseDetails)
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="detail-view">
        <div className="course-detail-container">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="sub-cont">
            <h1 className="course-name">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCourseInProgressView = () =>(<div data-testid="loader" >
                                     <Loader />
                                     </div> )

  renderCourseFailureView = () => (
    <div className="failure-container">
      <img src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png" alt="failure view" className="failure-image" />
      <h1>Oops! Something Went Wrong</h1>
    <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button
          type="button"
          onClick={this. getCourseDetailView}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus2, courseDetails} = this.state
    console.log(apiStatus2)
    console.log(courseDetails)
    switch (apiStatus2) {
      case apiStatusConst.success:
        return this.renderCourseSuccessView()
      case apiStatusConst.inProgress:
        return this.renderCourseInProgressView()
      case apiStatusConst.failure:
        return this.renderCourseFailureView()
      default:
        return null
    }
  }
}

export default CourseDetailApiView
