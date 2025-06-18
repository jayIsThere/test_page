import { useState, useEffect } from 'react';

import './firebase'; // 실행 목적 (firebase.js에서 실행되는 코드 포함)
import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './start.css';
import logo from './assets/Logo_CAP_Consulting_RGB_Darkblue.svg';


const candidates = [
  {
    id: '4 Farben',
    name: '4 Farben',
    colors: ['#808080', '#56768f', '#264555', '#d2c9b9'],
    fontWeight: {
      header: '700',
      title: '600',
      subtitle: '400',
      button: '500',
      usw: '200'
    },
    fontColor: {color:''},
  },
  {
    id: 'Grau',
    name: 'Grau',
    colors: ['#808080', '#808080', '#808080', '#808080'],
    fontWeight: {
      header: '600',
      title: '500',
      subtitle: '400',
      button: '600',
      usw: '300'
    },
    fontColor: {color:''},
  },
  {
    id: 'Blaugrau',
    name: 'Blaugrau',
    colors: ['#56768f', '#56768f', '#56768f', '#56768f'],
    fontWeight: {
      header: '700',
      title: '600',
      subtitle: '500',
      button: '600',
      usw: '200'
    },
    fontColor: {color:''},
  },
  {
    id: 'Dunkelblau',
    name: 'Dunkelblau',
    colors: ['#264555', '#264555', '#264555', '#264555'],
    fontWeight: {
      header: '600',
      title: '600',
      subtitle: '400',
      button: '500',
      usw: '300'
    },
    fontColor: {color:''},
  },
  {
    id: 'Beige',
    name: 'Beige',
    colors: ['#d2c9b9', '#d2c9b9', '#d2c9b9', '#d2c9b9'],
    fontWeight: {
      header: '700',
      title: '600',
      subtitle: '400',
      button: '500',
      usw: '200'
    },
        fontColor: {color: 'black'},
  },
  {
    id: 'red',
    name: 'RED',
    colors: ['#ff4d4d', '#ff9999', '#cc0000', '#ff6666', '#800000'],
    fontWeight: {
      header: '700',
      title: '700',
      subtitle: '500',
      button: '600',
      usw: '300'
    },
    fontColor: {color:''},
  },
  {
    id: 'blue',
    name: 'BLUE',
    colors: ['#4d79ff', '#99b3ff', '#0033cc', '#668cff', '#001a66'],
    fontWeight: {
      header: '600',
      title: '500',
      subtitle: '400',
      button: '500',
      usw: '200'
    },
    fontColor: {color:''},
  },
  {
    id: 'green',
    name: 'GREEN',
    colors: ['#33cc33', '#99ff99', '#009900', '#66cc66', '#004d00'],
    fontWeight: {
      header: '700',
      title: '600',
      subtitle: '400',
      button: '600',
      usw: '300'
    },
    fontColor: {color:''},
  },
  {
    id: 'purple',
    name: 'PURPLE',
    colors: ['#9933cc', '#cc99ff', '#660099', '#b266ff', '#33004d'],
    fontWeight: {
      header: '600',
      title: '600',
      subtitle: '400',
      button: '500',
      usw: '300'
    },
    fontColor: {color:''},
  },
  {
    id: 'orange',
    name: 'ORANGE',
    colors: ['#ff6600', '#ffb266', '#cc5200', '#ff8533', '#804000'],
    fontWeight: {
      header: '700',
      title: '600',
      subtitle: '400',
      button: '600',
      usw: '200'
    },
    fontColor: {color:''},
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
const [loading, setLoading] = useState(false);
const [inputText, setInputText] = useState('');

const handleSelectCandidate = (candidate) => {
  setSelected(candidate);
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



const handleSendText = async () => {
  if (!inputText.trim()) {
    alert('Schreiben Sie bitte erst etwas!');
    return;
  }

  try {
    const docRef = doc(db, 'texts', selected.id); // 'texts' 컬렉션 안에 selected.id 도큐먼트
    // 예를 들어 'texts' 문서 내 'message' 필드에 저장하거나 배열로 저장할 수도 있어요.

    // 단순히 필드 업데이트 (덮어쓰기)
    await setDoc(docRef, { message: inputText }, { merge: true });

    alert('Richtig gesendet. Vielen Dank!');
    setInputText(''); // 입력창 초기화
  } catch (error) {
    console.error('Firebase Error:', error);
    alert('Problem mit der Datenübertragung!');
  }
};






const theme = {
  background: selected.colors[0],
  primary: selected.colors[1],
  accent: selected.colors[2],
  text: selected.colors[4],
};


  const labels = ['Schriftgewicht', 'Hintergrundfarbe', 'Schriftfarbe', 'Layout'];
  
  


  if (loading) return <div>Loading...</div>;

    return (
    
       <div   style={{
       fontWeight: selected.fontWeight.title,
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
              fontWeight: selected.fontWeight.button,
            }}
          >
            {candidate.name}
          </button>
        ))}
      </div>

    <div
      style={{
        backgroundColor: '#f9fafb',
        color: '#fff',
        minHeight: '100vh',
        padding: 20,
        transition: 'all 0.3s ease',
        width: '90%',       
    margin: '0 auto', 
      }}
    >



<header class="header">
 <div class="header-container">

	<img style={{width: '170px', height:'170px'}} src={logo} alt="CAP Consulting"/>



        <nav class="navigation">
          <a href="#" class="nav-link" onClick={() => navigate('/test_page/')} style={{ fontWeight: selected.fontWeight.button }}>Start</a>
          <a href="#" class="nav-link"style={{ fontWeight: selected.fontWeight.button }}>Features</a>
          <a href="#" class="nav-link"style={{ fontWeight: selected.fontWeight.button }}>Über uns</a>
          <a href="#" class="nav-link"style={{ fontWeight: selected.fontWeight.button }}>Jetzt testen</a>
          <a href="#" class="nav-button"style={{ fontWeight: selected.fontWeight.button }}>Kontakt</a>
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
                style={{ marginLeft: '4px' }}
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
            <h1 class="main-title" style={{ fontWeight: selected.fontWeight.header }}>Umfrage Platform</h1>
            <p class="subtitle-main" style={{ fontWeight: selected.fontWeight.subtitle }}>
              Wählen Sie einen Katalog für Ihre Bewertung
            </p>
          </div>
        </div>



        <button class="mobile-menu-btn">
          <i class="ti ti-menu-2"></i>
        </button>
</div>

</header>


<div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  {/* 왼쪽: 버튼 그룹 */}
  <div style={{ textAlign: 'left', flex: 1, marginRight: 20 }}>
    <p style={{ fontWeight: 'bold', marginBottom: 8, color: 'black' }}>
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

  {/* 오른쪽: 텍스트 입력 + 버튼 */}
  <div style={{ textAlign: 'left', flexBasis: '300px', paddingLeft: 10, paddingRight: 10  }}>
    <p style={{ fontWeight: 'bold', marginBottom: 8, color: 'black' }}>
      Ihre Meinung
    </p>
    <textarea
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  placeholder="Was denken Sie über dieses Design?"
  style={{
    padding: '8px',
    width: '90%',
    height: '60px', // 대략 3줄 정도 높이
    marginBottom: '10px',
    resize: 'vertical', // 사용자가 세로 크기 조절 가능하게 (선택 사항)
  }}
/>
    <button
      onClick={handleSendText}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        fontWeight: selected.fontWeight.button,
        width: '95%',
      }}
    >
      Absenden
    </button>
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
<section class="main">
  <h1 style={{ fontWeight: selected.fontWeight.title }}>Willkommen zur Umfrage</h1>
  <p style={{ fontWeight: selected.fontWeight.usw }}>Beantworten Sie gezielt strukturierte Fragenkataloge und helfen Sie dabei, strategische Themen in Ihrem Unternehmen zu analysieren.</p>
</section>

<section class="stats">
  <div class="stat"><div class="number">4</div><div>Verfügbare Kataloge</div></div>
  <div class="stat"><div class="number">107</div><div>Geplante Projekte</div></div>
  <div class="stat"><div class="number">15</div><div>Spontanbewertungen</div></div>
</section>



  
<section class="catalogs" >

  <div class="survey-card"  style={{ fontWeight: selected.fontWeight.title }}>
    <div class="card-top blue" style={{ background: selected.colors[0], color: selected.fontColor.color }}>
      <div class="top-row">
        <span class="tag"style={{ fontWeight: selected.fontWeight.usw }}>IT-Strategie</span>
        <span class="questions"style={{ fontWeight: selected.fontWeight.usw }}>👤 25 Fragen</span>
      </div>
      <h2>IT-Strategie Grundlagen</h2>
      <p class="subtitle1"style={{ fontWeight: selected.fontWeight.subtitle }}>Bewertung der grundlegenden IT-Strategien und deren Umsetzung in Ihrem Unternehmen.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"style={{ fontWeight: selected.fontWeight.usw }}></span>Geschätzte Zeit: 15–20 Min</span>
        <span class="info"><span class="dot blue"style={{ fontWeight: selected.fontWeight.usw }}></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontWeight: selected.fontWeight.usw }}>
          <li>✔️ Dynamische Fragentiefe</li>
          <li>✔️ Echtzeit-Fortschrittsanzeigen</li>
          <li>✔️ Adaptive Fragenfelder</li>
        </ul>
      </div>
      <button class="start-button blue-btn" style={{ fontWeight: selected.fontWeight.button,  background: selected.colors[0], color: selected.fontColor.color }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontWeight: selected.fontWeight.title }}>
    <div class="card-top orange" style={{ background: selected.colors[1], color: selected.fontColor.color }}>
      <div class="top-row">
        <span class="tag"style={{ fontWeight: selected.fontWeight.usw }}>Cybersecurity</span>
        <span class="questions"style={{ fontWeight: selected.fontWeight.usw }}>👤 20 Fragen</span>
      </div>
      <h2>Cybersecurity Assessment</h2>
      <p class="subtitle1">Erhebung des Reifegrads Ihrer Informationssicherheit anhand konkreter Maßnahmen.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"style={{ fontWeight: selected.fontWeight.usw }}></span>Geschätzte Zeit: 20 Min</span>
        <span class="info"><span class="dot blue"style={{ fontWeight: selected.fontWeight.usw }}></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontWeight: selected.fontWeight.usw}}>
          <li>✔️ Maßnahmenübersicht</li>
          <li>✔️ Schwachstellen-Identifikation</li>
          <li>✔️ ISO-Nähe Bewertung</li>
        </ul>
      </div>
      <button class="start-button orange-btn" style={{ fontWeight: selected.fontWeight.button,  background: selected.colors[1], color: selected.fontColor.color }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontWeight: selected.fontWeight.title }}>
    <div class="card-top green" style={{ background: selected.colors[2], color: selected.fontColor.color }}>
      <div class="top-row">
        <span class="tag" style={{ fontWeight: selected.fontWeight.usw }}>Digitalisierung</span>
        <span class="questions" style={{ fontWeight: selected.fontWeight.usw }}>👤 18 Fragen</span>
      </div>
      <h2>Digital Transformation</h2>
      <p class="subtitle1" style={{ fontWeight: selected.fontWeight.subtitle }}>Bewertung des Digitalisierungsgrads Ihres Unternehmens im Branchenvergleich.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green" style={{ fontWeight: selected.fontWeight.usw }}></span>15 Min</span>
        <span class="info"><span class="dot blue" style={{ fontWeight: selected.fontWeight.usw }}></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontWeight: selected.fontWeight.usw }}>
          <li>✔️ Benchmark-Vergleich</li>
          <li>✔️ Reifegradmodelle</li>
          <li>✔️ Automatische Auswertung</li>
        </ul>
      </div>
      <button class="start-button green-btn"   style={{ fontWeight: selected.fontWeight.button,  background: selected.colors[2], color: selected.fontColor.color }}>Umfrage starten →</button>
    </div>
  </div>


  <div class="survey-card" style={{ fontWeight: selected.fontWeight.title }}>
    <div class="card-top purple" style={{ background: selected.colors[3], color: selected.fontColor.color }}>
      <div class="top-row">
        <span class="tag"style={{ fontWeight: selected.fontWeight.usw }}>Datenstrategie</span>
        <span class="questions"style={{ fontWeight: selected.fontWeight.usw }}>👤 22 Fragen</span>
      </div>
      <h2>Data Management</h2>
      <p class="subtitle1">Analyse der Datenmanagementstruktur und des Datenstrategie-Reifegrads Ihres Unternehmens.</p>
    </div>
    <div class="card-bottom">
      <div class="info-row">
        <span class="info"><span class="dot green"style={{ fontWeight: selected.fontWeight.usw }}></span>20 Min</span>
        <span class="info"><span class="dot blue"style={{ fontWeight: selected.fontWeight.usw }}></span>Interaktiv</span>
      </div>
      <div class="features">
        <strong>Umfrage-Features:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontWeight: selected.fontWeight.usw }}>
          <li>✔️ DQ-Check</li>
          <li>✔️ Governance-Analyse</li>
          <li>✔️ Zukunftsfähigkeit</li>
        </ul>
      </div>
      <button class="start-button purple-btn"   style={{ fontWeight: selected.fontWeight.button, background: selected.colors[3], color: selected.fontColor.color }}>Umfrage starten →</button>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer style={{ fontWeight: selected.fontWeight.subtitle,  backgroundColor: '#f9fafb', color: '#fff', padding: '20px', marginTop: 40 }}>
        <p>&copy; 2025 CAP Consulting. Alle Rechte vorbehalten.</p>
        <div className="secure-box">Ihre Daten sind sicher und geschützt.</div>
      </footer>
    </div>
    </div>
  );
}


