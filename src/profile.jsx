import { useState, useEffect } from 'react';

import './firebase'; // 실행 목적 (firebase.js에서 실행되는 코드 포함)
import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Routes, Route, useNavigate } from 'react-router-dom';



const candidates = [
  {
    id: 'test1-2',
    name: 'TEST1-2',
    colors: ['#807f7f', '#577893', '#264350', '#d4b383', '#800000'],
    fonts: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: 'test2-2',
    name: 'TEST2-2',
    colors: ['#807f7f', '#807f7f', '#807f7f', '#807f7f',  '#800000'],
    fonts: ['Verdana', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: 'test3-2',
    name: 'TEST3-2',
    colors: ['#577893', '#577893', '#577893', '#577893',  '#800000'],
    fonts: ['Maven Pro', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: 'test4-2',
    name: 'TEST4-2',
    colors: ['#264350', '#264350', '#264350', '#264350', '#800000'],
    fonts: ['Maven Pro', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
    {
    id: 'test5-2',
    name: 'TEST5-2',
    colors: ['#d4b383', '#d4b383', '#d4b383', '#d4b383', '#800000'],
    fonts: ['Maven Pro', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
  },
  
  
  {
    id: 'red-gothic-2',
    name: 'RED GOTHIC-2',
    colors: ['#ff4d4d', '#ff9999', '#cc0000', '#ff6666', '#800000'],
    fonts: ['Arial, sans-serif', 'Arial Black, sans-serif', 'Arial, sans-serif', 'Arial, sans-serif', 'Arial, sans-serif'],
  },
  {
    id: 'blue-serif-2',
    name: 'BLUE SERIF-2',
    colors: ['#4d79ff', '#99b3ff', '#0033cc', '#668cff', '#001a66'],
    fonts: ['"Times New Roman", serif', '"Georgia", serif', '"Times New Roman", serif', '"Times New Roman", serif', '"Georgia", serif'],
  },
  {
    id: 'green-mono-2',
    name: 'GREEN MONO-2',
    colors: ['#33cc33', '#99ff99', '#009900', '#66cc66', '#004d00'],
    fonts: ['"Courier New", monospace', '"Courier New", monospace', '"Lucida Console", monospace', '"Courier New", monospace', '"Courier New", monospace'],
  },
  {
    id: 'purple-cursive-2',
    name: 'PURPLE CURSIVE-2',
    colors: ['#9933cc', '#cc99ff', '#660099', '#b266ff', '#33004d'],
    fonts: ['"Comic Sans MS", cursive, sans-serif', '"Comic Sans MS", cursive, sans-serif', '"Brush Script MT", cursive', '"Comic Sans MS", cursive, sans-serif', '"Comic Sans MS", cursive, sans-serif'],
  },
  {
    id: 'orange-sans-2',
    name: 'ORANGE SANSERIF-2',
    colors: ['#ff6600', '#ffb266', '#cc5200', '#ff8533', '#804000'],
    fonts: ['"Verdana", sans-serif', '"Verdana", sans-serif', '"Geneva", sans-serif', '"Verdana", sans-serif', '"Verdana", sans-serif'],
  },
];





export default function ProfilePage() {

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
      <h1 style={{ marginBottom: 20}}>Test Page</h1>


    



      <div style={{ marginBottom: 20 }}>
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => handleSelectCandidate(candidate)}
            style={{
              marginRight: 10,
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




 <div style={{ marginTop: 10, textAlign: 'right' }}>
  <p style={{ fontWeight: 'bold', marginBottom: 8, color: 'white'}}>
    Klicken Sie bitte an, was Ihnen besonders gefällt. (Multiple Choice)
  </p>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          padding: '10px'
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


 
<style>{`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
        .app-container {
          display: flex;
          background-color: #f9fafb;
          color: #1f2937;
          min-height: 100vh; /* 화면 높이 채우기 */
            box-sizing: border-box; /* 여백 포함 높이 계산 */
      }

  
  
  .sidebar {
    width: 350px;
    background-color: #1e293b;
    color: white;
    padding: 20px;
    height: 100vh;
  }
  
  .sidebar h2 {
    font-size: 20px;
    margin-bottom: 6px;
  }
  
  .sidebar p {
    font-size: 14px;
    color: #cbd5e1;
  }
  
  .nav-section {
    margin-top: 30px;
  }
  
  .nav-section h4 {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 20px;
    margin-bottom: 16px;
  }
  
  .nav-link {
    display: block;
    padding: 10px;
    border-radius: 6px;
    color: #f1f5f9;
    text-decoration: none;
    margin-bottom: 6px;
    text-align: left;
  }
  
  .nav-link:hover,
  .nav-link.active {
    background-color: #334155;
  }
  
  .nav-item {
    margin-bottom: 40px;
    text-align: left;
  }
  
  .nav-link {
    display: block;
    font-weight: 600;
    color: #f1f5f9;
    text-decoration: none;
    padding: 4px 0;
    
  }
  
  .nav-subtext {
    font-size: 12px;
    color: #94a3b8;
    margin-left: 24px;
    margin-top: -4px;
  }
  .nav-sub {
    margin-left: 20px;
  }
  
  
  .main {

    flex: 1;
    padding: 30px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 30px; 
  }
  
  .header h1 {
    font-size: 46px;
    margin-bottom: 8px;
  }
  
  .header p {
    color: #6b7280;
    font-size: 15px;
  }
  
  
  .info-boxes {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .info-box {
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .info-box strong {
    font-size: 24px;
    display: block;
    margin-top: 4px;
  }
  
  .topics {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 8px;
  }
  
  .section-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }
  
  .create-button {
    background-color: #10b981;
    color: white;
    border: none;
    padding: 8px 14px;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .create-button:hover {
    background-color: #059669;
  }
  
  
  
  .topic-card {
    position: relative;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .topic-card ul {
    padding-left: 18px;
    margin-bottom: 16px;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-footer span {
    margin-right: 14px;
    font-size: 14px;
    color: #374151;
  }
  
  .card-button {
    background: linear-gradient(to right, #2563eb, #3b82f6);
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .card-button.blue {
    background: linear-gradient(to right, #2563eb, #3b82f6);
  }
  
  .card-button.green {
    background: linear-gradient(to right, #059669, #10b981);
  }
  
  .card-button.orange {
    background: linear-gradient(to right, #f97316, #fb923c);
  }
  
  .card-button.dark {
    background: linear-gradient(to right, #4b5563, #6b7280);
  }
  

  /* Der farbige Deckel */
.card-top-bar {
    height: 8px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .card-top-bar.blue {
    background-color: #3b82f6;
  }
  .card-top-bar.green {
    background-color: #10b981;
  }
  .card-top-bar.dark {
    background-color: #64748b;
  }
  .card-top-bar.orange {
    background-color: #f97316;
  }
  
  
  .topic-card.green {
    border-top-color: #10b981;
  }
  .topic-card.orange {
    border-top-color: #f97316;
  }
  .topic-card.dark {
    border-top-color: #64748b;
  }
  
  .topic-card h3 {
    margin-bottom: 6px;
  }
  
  .topic-card p {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 10px;
  }
  
  .topic-card small {
    font-size: 12px;
    color: #9ca3af;
  }
  
  .topic-card button {
    margin-top: 10px;
    padding: 6px 12px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .actions {
    background-color: #1e293b;
    padding: 30px 20px;
    border-radius: 10px;
    margin-top: 100px;
    text-align: center;
  }
  
  .actions h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  .actions button {
    padding: 8px 14px;
    margin: 0 6px;
    background-color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: black;
  }
  
`}</style>

    <title>Fragenkatalog Administration</title>

<div className="app-container">
        <div class="sidebar" style={{ fontFamily: selected.fonts[0] }}>
            <h2>📘 Fragenkatalog</h2>


            <div class="nav-section">
                <a class="nav-link active"style={{ fontFamily: selected.fonts[0] }}   onClick={() => navigate('/test_page/')}>🏠 Übersicht</a>
                <div class="nav-sub">
                    <a class="nav-link"style={{ fontFamily: selected.fonts[0] }}>📄 Finalkatalog erstellen</a>
                </div>

                <h4>THEMENSCHWERPUNKTE</h4>
                <div class="nav-item">
                    <a class="nav-link"style={{ fontFamily: selected.fonts[0] }}>🎯 IT Strategie</a>
                    <p class="nav-subtext"style={{ fontFamily: selected.fonts[0] }}>Strategische IT-Planung und -Ausrichtung</p>
                </div>
                <div class="nav-item">
                    <a class="nav-link"style={{ fontFamily: selected.fonts[0] }}>🛠️ IT Projektmanagement</a>
                    <p class="nav-subtext"style={{ fontFamily: selected.fonts[0] }}>Projektplanung und -durchführung</p>
                </div>
            </div>
            <div class="nav-item">
                <a class="nav-link"style={{ fontFamily: selected.fonts[0] }}>📦 Sourcing</a>
                <p class="nav-subtext"style={{ fontFamily: selected.fonts[0] }}>Beschaffung und Lieferantenmanagement</p>
            </div>
            <div class="nav-item">
                <a class="nav-link"style={{ fontFamily: selected.fonts[0] }}>🏢 Betriebsmodell</a>
                <p class="nav-subtext"style={{ fontFamily: selected.fonts[0] }}>Organisationsstrukturen und Prozesse</p>
            </div>
        </div>
        <div class="main">
            <div class="header">
                <h1>Fragenkatalog Administrator</h1>
                <p>Verwalten Sie Ihre Themenschwerpunkte und erstellen Sie finale Kataloge</p>
            </div>

            <div class="info-boxes">
                <div class="info-box">
                    Themenschwerpunkte
                    <strong>4</strong>
                </div>
                <div class="info-box">
                    Gesamtfragen
                    <strong>250</strong>
                </div>
                <div class="info-box">
                    Aktive Nutzer
                    <strong>89</strong>
                </div>
                <div class="info-box">
                    Letzte Änderung
                    <strong>Heute</strong>
                </div>
            </div>

            <div class="section-header">
                <h2>Themenschwerpunkte</h2>
                <button class="create-button">📄 finale Katalog erstellen</button>
            </div>

            <div class="topics">
                <div class="topic-card blue" style={{ background: "white" }}>
                    <div class="card-top-bar blue"style={{ background: selected.colors[0] }}></div>
                    <h3>IT Strategie</h3>
                    <ul>
                        <li>Strategische IT-Planung und -Ausrichtung</li>
                    </ul>
                    <div class="card-footer">
                        <div>
                            <span>Katalog 1</span>
                            <span>Fragen: 30</span>
                        </div>
                        <button class="card-button blue"style={{ background: selected.colors[0] }}>Verwalten →</button>
                    </div>
                </div>

                <div class="topic-card dark" style={{ background: "white" }}>
                    <div class="card-top-bar dark" style={{ background: selected.colors[1] }}></div>
                    <h3>IT Projektmanagement</h3>
                    <ul>
                        <li>Projektplanung und -durchführung</li>
                    </ul>
                    <div class="card-footer">
                        <div>
                            <span>Katalog 2</span>
                            <span>Fragen: 50</span>
                        </div>
                        <button class="card-button dark" style={{ background: selected.colors[1] }}>Verwalten →</button>
                    </div>
                </div>
                <div class="topic-card green"  style={{ background: "white" }}>
                    <div class="card-top-bar green"style={{ background: selected.colors[2] }}></div>
                    <h3>Sourcing</h3>
                    <ul>
                        <li>Beschaffung und Lieferantenmanagement</li>
                    </ul>
                    <div class="card-footer">
                        <div>
                            <span>Katalog 3</span>
                            <span>Fragen: 50</span>
                        </div>
                        <button class="card-button green" style={{ background: selected.colors[2] }}>Verwalten →</button>
                    </div>
                </div>

                <div class="topic-card orange" style={{ background: "white" }}>
                    <div class="card-top-bar  orange" style={{ background: selected.colors[3] }}></div>
                    <h3>Betriebsmodell</h3>
                    <ul>
                        <li>Organisationsstrukturen und Prozesse</li>
                    </ul>
                    <div class="card-footer">
                        <div>
                            <span>Katalog 4</span>
                            <span>Fragen: 40</span>
                        </div>
                        <button class="card-button orange" style={{ background: selected.colors[3] }}>Verwalten →</button>
                    </div>
                </div>

            </div>

            <div class="actions">
                <button>Alle exportieren</button>
                <button>Import/Export</button>
                <button>Einstellungen</button>
            </div>

        </div>
</div>





</div>


);
}
