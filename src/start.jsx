import { useState, useEffect } from 'react';

import './firebase'; // 실행 목적 (firebase.js에서 실행되는 코드 포함)
import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './start.css';

const candidates = [
  {
    id: 'ROBOTO 4 Farben',
    name: 'ROBOTO 4 Farben',
    colors: ['#807f7f', '#577893', '#264350', '#d4b383', '#800000'],
    fonts: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: '#807f7f Verdana',
    name: '#807f7f Verdana',
    colors: ['#807f7f', '#807f7f', '#807f7f', '#807f7f',  '#800000'],
    fonts: ['Verdana', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: '#577893 Maven Pro',
    name: '#577893 Maven Pro',
    colors: ['#577893', '#577893', '#577893', '#577893',  '#800000'],
    fonts: ['Maven Pro', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: '#264350 Helvetica Neue',
    name: '#264350 Helvetica Neue',
    colors: ['#264350', '#264350', '#264350', '#264350', '#800000'],
    fonts: ['Helvetica Neue', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: '#d4b383 Noto Sans',
    name: '#d4b383 Noto Sans',
    colors: ['#d4b383', '#d4b383', '#d4b383', '#d4b383', '#800000'],
    fonts: ['Noto Sans', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
  
  
  {
    id: 'red-gothic',
    name: 'RED GOTHIC',
    colors: ['#ff4d4d', '#ff9999', '#cc0000', '#ff6666', '#800000'],
    fonts: ['Arial, sans-serif', 'Arial Black, sans-serif', 'Arial, sans-serif', 'Arial, sans-serif', 'Arial, sans-serif'],
  },
  {
    id: 'blue-serif',
    name: 'BLUE SERIF',
    colors: ['#4d79ff', '#99b3ff', '#0033cc', '#668cff', '#001a66'],
    fonts: ['"Times New Roman", serif', '"Georgia", serif', '"Times New Roman", serif', '"Times New Roman", serif', '"Georgia", serif'],
  },
  {
    id: 'green-mono',
    name: 'GREEN MONO',
    colors: ['#33cc33', '#99ff99', '#009900', '#66cc66', '#004d00'],
    fonts: ['"Courier New", monospace', '"Courier New", monospace', '"Lucida Console", monospace', '"Courier New", monospace', '"Courier New", monospace'],
  },
  {
    id: 'purple-cursive',
    name: 'PURPLE CURSIVE',
    colors: ['#9933cc', '#cc99ff', '#660099', '#b266ff', '#33004d'],
    fonts: ['"Comic Sans MS", cursive, sans-serif', '"Comic Sans MS", cursive, sans-serif', '"Brush Script MT", cursive', '"Comic Sans MS", cursive, sans-serif', '"Comic Sans MS", cursive, sans-serif'],
  },
  {
    id: 'orange-sans',
    name: 'ORANGE SANSERIF',
    colors: ['#ff6600', '#ffb266', '#cc5200', '#ff8533', '#804000'],
    fonts: ['"Verdana", sans-serif', '"Verdana", sans-serif', '"Geneva", sans-serif', '"Verdana", sans-serif', '"Verdana", sans-serif'],
  },
];

const sections = [
  { id: 'header', label: 'HEADER' },
  { id: 'hero', label: 'SECTION' },
  { id: 'features', label: 'EIGENSCHAFTEN' },
  { id: 'cta', label: 'CTA' },
  { id: 'footer', label: 'FOOTER' },
];




export default function ComplexMultiVariant() {
 const navigate = useNavigate();
const [metaClickCounts, setMetaClickCounts] = useState({}); // labels 클릭 수 저장
  const [selected, setSelected] = useState(candidates[0]);
  const [clickCounts, setClickCounts] = useState({}); // { 'candidateId-sectionId': count }
  const [loading, setLoading] = useState(false);

const handleSelectCandidate = (candidate) => {
  setSelected(candidate);
};
const fetchClickCounts = async (candidateId) => {
  setLoading(true);
  const docRef = doc(db, 'clicks', candidateId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setClickCounts(docSnap.data());
  } else {
    const emptyCounts = {};
    sections.forEach(s => {
      emptyCounts[s.id] = 0;
    });
    setClickCounts(emptyCounts);
    await setDoc(docRef, emptyCounts);
  }
  setLoading(false);
};


const fetchMetaClickCounts = async (candidateId) => {
  setLoading(true);
  const docRef = doc(db, 'metaClicks', candidateId);  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setMetaClickCounts(docSnap.data());
  } else {
    const emptyCounts = {};
    labels.forEach(l => {
      emptyCounts[l] = 0;
    });
    setMetaClickCounts(emptyCounts);
    await setDoc(docRef, emptyCounts);
  }
  setLoading(false);
};

useEffect(() => {
  fetchClickCounts(selected.id);
  fetchMetaClickCounts(selected.id);
}, [selected]);

const handleMetaClick = async (label) => {
  const docRef = doc(db, 'metaClicks', selected.id);

  await updateDoc(docRef, {
    [label]: increment(1),
  });

  setMetaClickCounts(prev => {
    const newCounts = { ...prev, [label]: (prev[label] || 0) + 1 };
    alert(`${selected.name} - ${label} Klicks: ${newCounts[label]}`);
    return newCounts;
  });

  };



const theme = {
  background: selected.colors[0],
  primary: selected.colors[1],
  accent: selected.colors[2],
  text: selected.colors[4],
  font: selected.fonts[1],
};


  const labels = ['Schriftart', 'Farbe', 'Struktur', 'Icon', 'Layout'];
  
  


  if (loading) return <div>Loading...</div>;

    return (
    
       <div   style={{
    fontFamily: theme.font,
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    padding: 20,
    textAlign: 'center',
  }}>
      <h1>Test Page</h1>


    



      <div style={{ marginBottom: 20 }}>
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => handleSelectCandidate(candidate)}
            style={{
              marginRight: 30,
              marginBottom: 8,
              padding: '10px 16px',
              backgroundColor: selected.id === candidate.id ? '#4caf50' : '#ddd',
              color: selected.id === candidate.id ? 'white' : 'black',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {candidate.name}
          </button>
        ))}
      </div>

    <div
      style={{
        fontFamily: selected.fonts[0],
        backgroundColor: '#f9fafb',
        color: '#fff',
        minHeight: '100vh',
        padding: 20,
        transition: 'all 0.3s ease',
      }}
    >



<header class="header">
 <div class="header-container">

	<img style={{width: '50px', height:'50px'}} src="https://www.cap-consulting.de/wp-content/uploads/2022/11/videocover_startseite_cap.png" alt="CAP Consulting"/>



        <nav class="navigation">
          <a href="#" class="nav-link" onClick={() => navigate('/test_page/')}>Start</a>
          <a href="#" class="nav-link">Features</a>
          <a href="#" class="nav-link">Über uns</a>
          <a href="#" class="nav-link">Jetzt testen</a>
          <a href="#" class="nav-button">Kontakt</a>
        </nav>


        <div class="right-section">

          <div class="profile-container">

            <div class="parallelogram-bg"></div>


            <div class="profile-content">

              <div class="profile-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                  alt="Profile"
                  class="avatar-img"
                  onClick={() => navigate('/test_page/profile')}
                />
              </div>

              <svg
                width="12"
                height="6"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="dropdown-icon"
              >
                <path
                  d="M2 2L8 8L14 2"
                  stroke="#1E1E1E"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>


<div class="title-section">
            <h1 class="main-title" style={{ fontFamily: selected.fonts[0] }}>Umfrage Platform</h1>
            <p class="subtitle-main" style={{ fontFamily: selected.fonts[0] }}>
              Wählen Sie einen Katalog für Ihre Bewertung
            </p>
          </div>
        </div>



        <button class="mobile-menu-btn">
          <i class="ti ti-menu-2"></i>
        </button>
</div>

</header>



 <div style={{ marginTop: 10, textAlign: 'left' }}>
  <p style={{ fontWeight: 'bold', marginBottom: 8, color: 'black'}}>
    Klicken Sie bitte an, was Ihnen besonders gefällt. (Multiple Choice)
  </p>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => handleMetaClick(label)}
            style={{
              padding: '6px 12px',
              fontSize: 13,
              borderRadius: 4,
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer',
              color: '#333',
            }}
          >
            {label}
          </button>
        ))}
      </div>
  </div>





<div class="mobile-nav" id="mobileNav">
      <nav class="mobile-nav-content">
        <a href="#" class="mobile-nav-link">Start</a>
        <a href="#" class="mobile-nav-link">Features</a>
        <a href="#" class="mobile-nav-link">Über uns</a>
        <a href="#" class="mobile-nav-button">Jetzt testen</a>
        <a href="#" class="mobile-nav-link">Kontakt</a>

        <div class="mobile-profile-section">
          <div class="mobile-profile">
            <div class="mobile-avatar">
              <span>JD</span>
            </div>
            <span class="mobile-profile-text">Profil</span>
          </div>
        </div>
      </nav>
    </div>
<section class="main" style={{ fontFamily: selected.fonts[0] }}>
  <h1>Willkommen zur Umfrage</h1>
  <p>Beantworten Sie gezielt strukturierte Fragenkataloge und helfen Sie dabei, strategische Themen in Ihrem Unternehmen zu analysieren.</p>
</section>

<section class="stats">
  <div class="stat"><div class="number">4</div><div>Verfügbare Kataloge</div></div>
  <div class="stat"><div class="number">107</div><div>Geplante Projekte</div></div>
  <div class="stat"><div class="number">15</div><div>Spontanbewertungen</div></div>
</section>



  
<section class="catalogs">

  <div class="survey-card"  style={{ fontFamily: selected.fonts[0] }}>
    <div class="card-top blue" style={{ background: selected.colors[0] }}>
      <div class="top-row">
        <span class="tag">IT-Strategie</span>
        <span class="questions">👤 25 Fragen</span>
      </div>
      <h2>IT-Strategie Grundlagen</h2>
      <p class="subtitle1">Bewertung der grundlegenden IT-Strategien und deren Umsetzung in Ihrem Unternehmen.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"></span>Geschätzte Zeit: 15–20 Min</span>
        <span class="info"><span class="dot blue"></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>✔️ Dynamische Fragentiefe</li>
          <li>✔️ Echtzeit-Fortschrittsanzeigen</li>
          <li>✔️ Adaptive Fragenfelder</li>
        </ul>
      </div>
      <button class="start-button blue-btn" style={{ background: selected.colors[0] }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontFamily: selected.fonts[0] }}>
    <div class="card-top orange" style={{ background: selected.colors[1] }}>
      <div class="top-row">
        <span class="tag">Cybersecurity</span>
        <span class="questions">👤 20 Fragen</span>
      </div>
      <h2>Cybersecurity Assessment</h2>
      <p class="subtitle1">Erhebung des Reifegrads Ihrer Informationssicherheit anhand konkreter Maßnahmen.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"></span>Geschätzte Zeit: 20 Min</span>
        <span class="info"><span class="dot blue"></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>✔️ Maßnahmenübersicht</li>
          <li>✔️ Schwachstellen-Identifikation</li>
          <li>✔️ ISO-Nähe Bewertung</li>
        </ul>
      </div>
      <button class="start-button orange-btn" style={{ background: selected.colors[1] }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontFamily: selected.fonts[0] }}>
    <div class="card-top green" style={{ background: selected.colors[2] }}>
      <div class="top-row">
        <span class="tag">Digitalisierung</span>
        <span class="questions">👤 18 Fragen</span>
      </div>
      <h2>Digital Transformation</h2>
      <p class="subtitle1">Bewertung des Digitalisierungsgrads Ihres Unternehmens im Branchenvergleich.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"></span>15 Min</span>
        <span class="info"><span class="dot blue"></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>✔️ Benchmark-Vergleich</li>
          <li>✔️ Reifegradmodelle</li>
          <li>✔️ Automatische Auswertung</li>
        </ul>
      </div>
      <button class="start-button green-btn"   style={{ background: selected.colors[2] }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontFamily: selected.fonts[0] }}>
    <div class="card-top purple" style={{ background: selected.colors[3] }}>
      <div class="top-row">
        <span class="tag">Datenstrategie</span>
        <span class="questions">👤 22 Fragen</span>
      </div>
      <h2>Data Management</h2>
      <p class="subtitle1">Analyse der Datenmanagementstruktur und des Datenstrategie-Reifegrads Ihres Unternehmens.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"></span>20 Min</span>
        <span class="info"><span class="dot blue"></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>✔️ DQ-Check</li>
          <li>✔️ Governance-Analyse</li>
          <li>✔️ Zukunftsfähigkeit</li>
        </ul>
      </div>
      <button class="start-button purple-btn"   style={{ background: selected.colors[3] }}>Umfrage starten →</button>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer style={{ fontFamily: selected.fonts[0], backgroundColor: '#f9fafb', color: '#fff', padding: '20px', marginTop: 40 }}>
        <p>&copy; 2025 CAP Consulting. Alle Rechte vorbehalten.</p>
        <div className="secure-box">Ihre Daten sind sicher und geschützt.</div>
      </footer>
    </div>
    </div>
  );
}


