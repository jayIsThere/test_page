import { useState, useEffect } from 'react';
import './App.css';

const candidates = [
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
  const [selected, setSelected] = useState(candidates[0]);
  const [clickCounts, setClickCounts] = useState({}); // { 'candidateId-sectionId': count }

  useEffect(() => {
    const savedCounts = localStorage.getItem('click-counts');
    const savedSelected = localStorage.getItem('selected-candidate');

    if (savedCounts) setClickCounts(JSON.parse(savedCounts));
    if (savedSelected) {
      const sel = JSON.parse(savedSelected);
      const found = candidates.find(c => c.id === sel.id);
      if (found) setSelected(found);
    }
  }, []);

  const handleSelectCandidate = (candidate) => {
    setSelected(candidate);
    localStorage.setItem('selected-candidate', JSON.stringify(candidate));
  };

  const handleClick = (sectionId) => {
    const key = `${selected.id}-${sectionId}`;
    const newCounts = { ...clickCounts, [key]: (clickCounts[key] || 0) + 1 };
    setClickCounts(newCounts);
    localStorage.setItem('click-counts', JSON.stringify(newCounts));
    alert(`${selected.name} - ${sections.find(s => s.id === sectionId).label} Die gesamten Clicks: ${newCounts[key]}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <h1>Test Page</h1>

      {/* 후보군 선택 탭 */}
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

      {/* 페이지 섹션들 */}
      <div style={{ border: `4px solid ${selected.colors[0]}`, borderRadius: 10, overflow: 'hidden' }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: selected.colors[0],
            color: 'white',
            fontFamily: selected.fonts[0],
            padding: '20px 30px',
            textAlign: 'center',
          }}
        >
          <h2>HEADER - {selected.name}</h2>
          <button
            onClick={() => handleClick('header')}
            style={{
              marginTop: 10,
              padding: '8px 16px',
              backgroundColor: 'white',
              color: selected.colors[0],
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            CLICK ({clickCounts[`${selected.id}-header`] || 0})
          </button>
        </header>

        {/* Hero Section */}
        <section
          style={{
            backgroundColor: selected.colors[1],
            fontFamily: selected.fonts[1],
            color: '#222',
            padding: '40px 30px',
            textAlign: 'center',
          }}
        >
          <h2>SECTION</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', fontSize: 18 }}>
            SECTION BEREICH
          </p>
          <button
            onClick={() => handleClick('hero')}
            style={{
              marginTop: 20,
              padding: '12px 28px',
              backgroundColor: selected.colors[0],
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            SECTION Click ({clickCounts[`${selected.id}-hero`] || 0})
          </button>
        </section>

        {/* Features Section */}
        <section
          style={{
            backgroundColor: selected.colors[2],
            fontFamily: selected.fonts[2],
            color: 'white',
            padding: '30px',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              style={{
                backgroundColor: selected.colors[3],
                borderRadius: 10,
                padding: 20,
                margin: 10,
                width: 250,
                boxShadow: `0 0 10px ${selected.colors[4]}`,
                color: 'white',
                fontFamily: selected.fonts[3],
              }}
            >
              <h3>EIGENSCHAFTEN {num}</h3>
              <p>DIESE EIGENSCHAFTEN WURDEN MIT {selected.name} ERSTELLT.</p>
              <button
                onClick={() => handleClick('features')}
                style={{
                  marginTop: 10,
                  padding: '8px 16px',
                  backgroundColor: selected.colors[4],
                  border: 'none',
                  borderRadius: 5,
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                Click ({clickCounts[`${selected.id}-features`] || 0})
              </button>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section
          style={{
            backgroundColor: selected.colors[3],
            fontFamily: selected.fonts[3],
            color: 'white',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h2>NEHMEN SIE BITTE TEIL!</h2>
          <button
            onClick={() => handleClick('cta')}
            style={{
              padding: '16px 40px',
              fontSize: 18,
              backgroundColor: selected.colors[4],
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              color: 'white',
            }}
          >
            TEILNEHMEN ({clickCounts[`${selected.id}-cta`] || 0})
          </button>
        </section>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: selected.colors[4],
            color: 'white',
            fontFamily: selected.fonts[4],
            padding: '20px 30px',
            textAlign: 'center',
          }}
        >
          <small>© 2025 {selected.name} Test Page</small>
          <br />
          <button
            onClick={() => handleClick('footer')}
            style={{
              marginTop: 10,
              padding: '8px 16px',
              backgroundColor: 'white',
              color: selected.colors[4],
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Click ({clickCounts[`${selected.id}-footer`] || 0})
          </button>
        </footer>
      </div>
    </div>
  );
}

