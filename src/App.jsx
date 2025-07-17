import './App.css'
import LeafImg from './assets/Leaf.png'
import GradImg from './assets/Grad.png'
import { useState } from 'react'
import data from './data.json'

function App() {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState('')
  const [tableNumber, setTableNumber] = useState('')

  const filtered = data.filter(
    row => row.name && row.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSearch() {
    const found = data.find(row => row.name && row.name.toLowerCase() === search.toLowerCase())
    if (found && found.tabel) {
      setTableNumber(found.tabel)
    } else {
      setTableNumber('')
    }
  }

  return (
    <div className="main-grid">
      <div className="header-row">
        Tej's Graduation Party
      </div>
      <div className="content-row">
        <div className="columns-placeholder">
          <div className="left-column">
            <div className="image-stack">
              <img src={LeafImg} alt="Leaf 1" className="stacked-image top-image" />
              <img src={GradImg} alt="Leaf 2" className="stacked-image bottom-image" />
            </div>
          </div>
          <div className="right-column">
            <div className="welcome-block">
              <div className="welcome-text">
                WELCOME TO THE<br />TEJ'S GRADUTIOAN PARTY
              </div>
              <div className="search-block">
                <div className="search-bar-container">
                  <div className='search-input-wrapper'>
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search name..."
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value)
                      setShowDropdown(true)
                      setTableNumber('')
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  />
                  </div>
                  
                  <button className="search-btn" onClick={handleSearch}>SEARCH</button>
                  {showDropdown && filtered.length > 0 && (
                    <ul className="search-dropdown">
                      {filtered.map(row => (
                        <li
                          key={row.name}
                          onMouseDown={() => {
                            setSearch(row.name)
                            setSelected(row.name)
                            setShowDropdown(false)
                            setTableNumber('')
                          }}
                        >
                          {row.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
               
              </div>
              {tableNumber && (
                  <div className="table-number-display">
                    Table Number: <b>{tableNumber}</b>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
