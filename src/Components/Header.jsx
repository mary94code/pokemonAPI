import { NavLink } from 'react-router-dom'


export default function Header() {
  
  return (
    <header>
      <nav>
        <NavLink className="logo_link" to="/">
          <img className='logo_img' src="./images/logo.svg" alt="logo" />
        </NavLink>
        <ul>
          <li>
            <NavLink to="/" style={{ cursor: "pointer" }}>All pokemons</NavLink>
          </li>
          <li>
            <NavLink to="/comparepokemons" style={{ cursor: "pointer" }}>Compare pokemons</NavLink>
          </li>
          <li>
            <NavLink to="/myfavourites">
              My favourites
            </NavLink>

          </li>
        </ul>
      </nav>
    </header>
  )
}
