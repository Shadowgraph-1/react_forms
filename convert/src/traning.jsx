import { useState } from 'react';
import './traning.css';

export default function TrainingLog() {
  const [entries, setEntries] = useState([
    { date: '2019-07-20', distance: 5.7 },
    { date: '2019-07-21', distance: 4.3 },
    { date: '2019-07-22', distance: 6.1 },
    { date: '2019-07-23', distance: 3.9 },
    { date: '2019-07-24', distance: 7.5 },
    { date: '2019-07-25', distance: 2.8 },
    { date: '2019-07-26', distance: 5.2 },
  ]);

  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [view, setView] = useState('trainings');

  const sortByDateDesc = (list) => {
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance) return;

    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return;

    setEntries((prev) => {
      const isEditing = editingIndex !== null;

      if (isEditing) {
        const duplicateIndex = prev.findIndex(
          (entry, idx) => entry.date === date && idx !== editingIndex
        );

        if (duplicateIndex !== -1) {
          const mergedDistance = prev[duplicateIndex].distance + dist;
          const next = prev
            .filter((_, idx) => idx !== editingIndex && idx !== duplicateIndex)
            .concat({ date, distance: mergedDistance });
          return sortByDateDesc(next);
        }

        const next = prev.map((entry, idx) => (
          idx === editingIndex ? { date, distance: dist } : entry
        ));
        return sortByDateDesc(next);
      }

      const existingIndex = prev.findIndex((entry) => entry.date === date);
      if (existingIndex !== -1) {
        const next = prev.map((entry, idx) => (
          idx === existingIndex
            ? { ...entry, distance: entry.distance + dist }
            : entry
        ));
        return sortByDateDesc(next);
      }

      return sortByDateDesc([...prev, { date, distance: dist }]);
    });

    setDate('');
    setDistance('');
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setDate('');
      setDistance('');
      setEditingIndex(null);
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex((prevIndex) => (prevIndex === null ? null : prevIndex - 1));
    }
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setDate(entry.date);
    setDistance(entry.distance.toString());
    setEditingIndex(index);
  };

  const formatDistance = (num) => {
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
  };

  return (
    <div className="tl">
      <div className="tl__container">
        <div className="tl__header">
          <div className="tl__view-tabs">
            <button
              className={view === 'trainings' ? 'tl__view-tab tl__view-tab--active' : 'tl__view-tab'}
              onClick={() => setView('trainings')}
            >
              Тренировки
            </button>
            <button
              className={view === 'walks' ? 'tl__view-tab tl__view-tab--active' : 'tl__view-tab'}
              onClick={() => setView('walks')}
            >
              Прогулки
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="tl__form">
          <div className="tl__form-group">
            <label className="tl__form-label">Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="tl__form-input"
            />
          </div>

          <div className="tl__form-group">
            <label className="tl__form-label">Км</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              placeholder="0.0"
              className="tl__form-input"
            />
          </div>

          <button type="submit" className="tl__submit">
            {editingIndex !== null ? 'Сохранить' : 'Добавить'}
          </button>
        </form>

        <div className="tl__table-wrapper">
          <table className="tl__table">
            <thead>
              <tr className="tl__table-header-row">
                <th className="tl__table-header">Дата</th>
                <th className="tl__table-header">Дистанция</th>
                <th className="tl__table-header-actions"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="tl__table-row">
                  <td className="tl__table-cell">
                    {new Date(entry.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="tl__table-cell-distance">
                    {formatDistance(entry.distance)} км
                  </td>
                  <td className="tl__table-cell-actions">
                    <button
                      className="tl__action"
                      onClick={() => handleEdit(index)}
                      type="button"
                    >
                      ✎
                    </button>
                    <button
                      className="tl__action"
                      onClick={() => handleDelete(index)}
                      type="button"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
