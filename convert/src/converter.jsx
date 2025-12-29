import { useState, useEffect } from 'react';

export default function ColorConverter() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [error, setError] = useState('');
  const [previewColor, setPreviewColor] = useState('#ffffff');

  useEffect(() => {
    if (hex.length < 7) {
      setRgb('');
      setError('');
      setPreviewColor('#ffffff');
      return;
    }

    if (hex.length === 7) {
      const isValid = /^#[0-9A-Fa-f]{6}$/.test(hex);

      if (isValid) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        setRgb(`rgb(${r}, ${g}, ${b})`);
        setError('');
        setPreviewColor(hex);
      } else {
        setRgb('');
        setError('Ошибка формата');
        setPreviewColor('#ffffff');
      }
    }
  }, [hex]);

  const handleChange = (e) => {
    let value = e.target.value.toUpperCase();

    if (value.length > 7) return;
    if (value.length > 0 && value[0] !== '#') return;
    if (!/^#?[0-9A-Fa-f]*$/.test(value)) return;

    setHex(value);
  };

  const textColor = previewColor !== '#ffffff' ? getContrastColor(previewColor) : '#000000';

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.preview,
        backgroundColor: previewColor,
        transition: 'background-color 0.3s ease'
      }}>
        <div style={styles.content}>
          <h1 style={{ ...styles.title, color: textColor }}>
            HEX → RGB
          </h1>

          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: textColor }}>
              Цвет
            </label>
            <input
              type="text"
              value={hex}
              onChange={handleChange}
              placeholder="#000000"
              maxLength={7}
              style={{
                ...styles.input,
                borderColor: error ? '#000' : (textColor === '#000000' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.3)'),
                color: textColor,
                backgroundColor: textColor === '#000000' ? '#ffffff' : 'rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>

          {rgb && (
            <div style={{
              ...styles.result,
              color: textColor,
              borderColor: textColor === '#000000' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.3)'
            }}>
              {rgb}
            </div>
          )}

          {error && (
            <div style={{ ...styles.error, color: textColor }}>
              {error}
            </div>
          )}

          <p style={{ ...styles.hint, color: textColor, opacity: 0.6 }}>
            Формат: #RRGGBB
          </p>
        </div>
      </div>
    </div>
  );
}

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)'
  },
  preview: {
    width: '100%',
    maxWidth: '500px',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
  },
  content: {
    width: '100%',
    maxWidth: '360px',
    padding: '40px'
  },
  title: {
    fontSize: '42px',
    fontWeight: '300',
    fontFamily: "'Space Mono', monospace",
    marginBottom: '48px',
    letterSpacing: '-1px'
  },
  inputGroup: {
    marginBottom: '32px'
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '12px'
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '24px',
    fontFamily: "'Space Mono', monospace",
    border: '1px solid',
    borderRadius: '2px',
    outline: 'none',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  result: {
    padding: '20px',
    fontSize: '18px',
    fontFamily: "'Space Mono', monospace",
    textAlign: 'center',
    border: '1px solid',
    borderRadius: '2px',
    marginBottom: '24px',
    letterSpacing: '0.5px'
  },
  error: {
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '16px'
  },
  hint: {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '32px',
    fontFamily: "'Space Mono', monospace",
    letterSpacing: '0.5px'
  }
};