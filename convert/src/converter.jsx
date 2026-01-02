import { useState } from 'react';
import './converter.css';

export default function ColorConverter() {
  const [hex, setHex] = useState('');

  const handleChange = (e) => {
    let value = e.target.value.toUpperCase();

    if (value.length > 7) return;
    if (value.length > 0 && value[0] !== '#') return;
    if (!/^#?[0-9A-Fa-f]*$/.test(value)) return;

    setHex(value);
  };

  const { rgb, error, previewColor } = deriveColorFromHex(hex);
  const textColor = previewColor !== '#ffffff' ? getContrastColor(previewColor) : '#000000';
  const inputBorderColor = error
    ? 'var(--black)'
    : (textColor === '#000000' ? 'var(--gray-300)' : 'rgba(255, 255, 255, 0.3)');
  const inputBackgroundColor = textColor === '#000000' ? 'var(--white)' : 'rgba(0, 0, 0, 0.1)';
  const resultBorderColor = textColor === '#000000' ? 'var(--gray-300)' : 'rgba(255, 255, 255, 0.3)';

  const cssVars = {
    '--cc-preview-color': previewColor,
    '--cc-text-color': textColor,
    '--cc-input-border-color': inputBorderColor,
    '--cc-input-bg-color': inputBackgroundColor,
    '--cc-result-border-color': resultBorderColor,
  };

  return (
    <div className="cc" style={cssVars}>
      <div className="cc__preview">
        <div className="cc__content">
          <h1 className="cc__title">
            HEX → RGB
          </h1>

          <div className="cc__input-group">
            <label className="cc__label">
              Цвет
            </label>
            <input
              type="text"
              value={hex}
              onChange={handleChange}
              placeholder="#000000"
              maxLength={7}
              className="cc__input"
            />
          </div>

          {rgb && (
            <div className="cc__result">
              {rgb}
            </div>
          )}

          {error && (
            <div className="cc__error">
              {error}
            </div>
          )}

          <p className="cc__hint">
            Формат: #RRGGBB
          </p>
        </div>
      </div>
    </div>
  );
}

function deriveColorFromHex(hex) {
  if (hex.length !== 7) {
    return { rgb: '', error: '', previewColor: '#ffffff' };
  }

  const isValid = /^#[0-9A-Fa-f]{6}$/.test(hex);
  if (!isValid) {
    return { rgb: '', error: 'Ошибка формата', previewColor: '#ffffff' };
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { rgb: `rgb(${r}, ${g}, ${b})`, error: '', previewColor: hex };
}

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
