import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseItem} = props
  const {name, id, logoUrl} = courseItem

  return (
    <li>
      <Link style={{textDecoration: 'none'}} to={`./courses/${id}`}>
        <div className="list-item">
          <img src={logoUrl} alt={name} className="course-logo" />
          <p className="name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem
