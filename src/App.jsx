import './App.css'
import LeafImg from './assets/Leaf.png'
import GradImg from './assets/Grad.png'
import { useState } from 'react'
import data from './data.json'

// PhotoUpload component
function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const backendURL = process.env.URL;

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);
    setError('');

    // Option 1: Upload to your backend server (recommended)
    // Your backend should handle Google Drive API authentication and upload
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });

      // Replace with your actual backend endpoint
      const response = await fetch(backendURL, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary for FormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Upload failed');
      }
      
      setSuccess(true);
      setSelectedFiles([]);
    } catch (err) {
      console.error('Upload error:', err);
      
      // Check for specific CORS errors
      if (err.message.includes('CORS') || err.message.includes('Access-Control')) {
        setError('CORS Error: Please ensure your backend server is running and configured properly.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network Error: Unable to connect to the server. Please check your internet connection.');
      } else {
        setError(`Upload failed: ${err.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      marginTop: '2.5rem',
      padding: '2rem',
      border: '2px solid #e0d6c3',
      borderRadius: '1.5rem',
      background: 'linear-gradient(135deg, #f9f8f5 0%, #f5f3ed 100%)',
      maxWidth: 500,
      width: '100%',
      boxShadow: '0 8px 32px rgba(34,84,61,0.12), 0 4px 16px rgba(34,84,61,0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
        borderRadius: '50%',
        opacity: 0.3,
        transform: 'rotate(15deg)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-15px',
        left: '-15px',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
        borderRadius: '50%',
        opacity: 0.4,
        transform: 'rotate(-20deg)'
      }}></div>
      
      <div style={{
        fontFamily: "'Montserrat', Arial, sans-serif",
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: '1rem',
        color: '#2d432c',
        textAlign: 'center',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        📸 Capture the Moment! 📸
      </div>
      
      <div style={{
        fontFamily: "'Montserrat', Arial, sans-serif",
        fontWeight: 400,
        fontSize: '0.9rem',
        marginBottom: '1.2rem',
        color: '#4a5568',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        Please take pictures and upload them here to make this event truly memorable! 🎉
      </div>
      
      <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          border: '2px dashed #cbd5e0',
          borderRadius: '1rem',
          padding: '1.5rem',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.6)',
          marginBottom: '1.5rem',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            style={{ 
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
              cursor: 'pointer'
            }}
          />
          <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>📷</div>
          <div style={{
            fontFamily: "'Montserrat', Arial, sans-serif",
            fontWeight: 500,
            color: '#4a5568',
            fontSize: '0.9rem'
          }}>
            {selectedFiles.length > 0 
              ? `${selectedFiles.length} file(s) selected` 
              : 'Click to select photos or drag & drop'
            }
          </div>
        </div>
        
        <button
          type="submit"
          disabled={uploading || selectedFiles.length === 0}
          style={{
            width: '100%',
            padding: '0.8rem 1.5rem',
            background: selectedFiles.length > 0 
              ? 'linear-gradient(135deg, #22543d 0%, #2d5a3d 100%)'
              : '#cbd5e0',
            color: 'white',
            border: 'none',
            borderRadius: '0.8rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: selectedFiles.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: selectedFiles.length > 0 
              ? '0 4px 15px rgba(34,84,61,0.3)'
              : 'none',
            transform: selectedFiles.length > 0 ? 'translateY(0)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (selectedFiles.length > 0) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(34,84,61,0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFiles.length > 0) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(34,84,61,0.3)';
            }
          }}
        >
          {uploading ? '⏳ Uploading...' : '🚀 Submit Photos'}
        </button>
        
        {success && (
          <div style={{
            marginTop: '1rem',
            padding: '0.8rem',
            background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
            border: '1px solid #68d391',
            borderRadius: '0.6rem',
            color: '#22543d',
            fontWeight: 500,
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            🎉 Photos uploaded successfully! Thank you for sharing the memories!
          </div>
        )}
        
        {error && (
          <div style={{
            marginTop: '1rem',
            padding: '0.8rem',
            background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
            border: '1px solid #fc8181',
            borderRadius: '0.6rem',
            color: '#c53030',
            fontWeight: 500,
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  );
}

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
            <PhotoUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
