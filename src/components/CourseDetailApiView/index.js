import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
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

  onClickReloadPage = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return <Redirect to={`/courses/${id}`} />
  }

  getCourseDetailView = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus2: apiStatusConst.inProgress})
    const url2 = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url2, options)

    const fetchData = await response.json()

    if (response.ok) {
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

  renderSuccessView = () => {
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

  renderInProgressView = () => <Loader data-testid="loader" />

  renderFailureView = () => (
    <div className="failure-container">
      <img src="" alt="failure view" className="failure-image" />
      <div>
        <button
          type="button"
          onClick={this.onClickReloadPage}
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
        return this.renderSuccessView()
      case apiStatusConst.inProgress:
        return this.renderInProgressView()
      case apiStatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default CourseDetailApiView
