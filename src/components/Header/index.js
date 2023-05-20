import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <Link to="/">
    <nav className="nav-item">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo"
      />
    </nav>
  </Link>
)

export default Header
