import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code">Social Network</i>
        </Link>
      </h1>
      <ul>
        <li>
          <a href="profile.html">Developers</a>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}
