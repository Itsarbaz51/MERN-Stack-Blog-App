import { Link } from 'react-router-dom'

function Footer() {
  return (
    <Footer>
      <div>
          <ul>
            <li><Link to='/posts/categories/Agriclture'>Agriclture</Link></li>
            <li><Link to='/posts/categories/Business'>Business</Link></li>
            <li><Link to='/posts/categories/Education'>Education</Link></li>
            <li><Link to='/posts/categories/Entertainment'>Entertainment</Link></li>
            <li><Link to='/posts/categories/Art'>Art</Link></li>
            <li><Link to='/posts/categories/Invester'>Invester</Link></li>
            <li><Link to='/posts/categories/Uncotegorized'>Uncotegorized</Link></li>
            <li><Link to='/posts/categories/Weather'>Weather</Link></li>
          </ul>
        <div>
        <small>All Rights Reserved &copy; Copyright, @_devArbaz</small>
        </div>
      </div>
    </Footer>
  )
}

export default Footer