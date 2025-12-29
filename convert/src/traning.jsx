import { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance) return;

    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return;

    setEntries((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex((entry) => entry.date === date);

      if (existingIndex !== -1) {
        updated[existingIndex].distance += dist;
      } else {
        updated.push({ date, distance: dist });
      }

      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    setDate('');
    setDistance('');
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
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
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.viewTabs}>
            <button
              style={{
                ...styles.viewTab,
                ...(view === 'trainings' ? styles.viewTabActive : {})
              }}
              onClick={() => setView('trainings')}
            >
              Тренировки
            </button>
            <button
              style={{
                ...styles.viewTab,
                ...(view === 'walks' ? styles.viewTabActive : {})
              }}
              onClick={() => setView('walks')}
            >
              Прогулки
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={styles.formInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Км</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              placeholder="0.0"
              style={styles.formInput}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            {editingIndex !== null ? 'Сохранить' : 'Добавить'}
          </button>
        </form>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Дата</th>
                <th style={styles.tableHeader}>Дистанция</th>
                <th style={styles.tableHeaderActions}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    {new Date(entry.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td style={styles.tableCellDistance}>
                    {formatDistance(entry.distance)} км
                  </td>
                  <td style={styles.tableCellActions}>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleEdit(index)}
                    >
                      ✎
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleDelete(index)}
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

const styles = {
  wrapper: {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
    padding: '60px 20px'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '48px'
  },
  viewTabs: {
    display: 'inline-flex',
    gap: '0',
    border: '1px solid var(--gray-300)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  viewTab: {
    padding: '12px 28px',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: "'Space Mono', monospace",
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'var(--gray-600)',
    letterSpacing: '0.5px'
  },
  viewTabActive: {
    background: 'var(--black)',
    color: 'var(--white)'
  },
  form: {
    display: 'flex',
    gap: '16px',
    marginBottom: '48px',
    padding: '32px',
    background: 'var(--white)',
    border: '1px solid var(--gray-300)',
    borderRadius: '2px',
    alignItems: 'flex-end'
  },
  formGroup: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  formLabel: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '10px',
    color: 'var(--gray-600)'
  },
  formInput: {
    padding: '14px 16px',
    fontSize: '15px',
    fontFamily: "'Space Mono', monospace",
    border: '1px solid var(--gray-300)',
    borderRadius: '2px',
    outline: 'none',
    transition: 'all 0.2s ease',
    background: 'var(--white)'
  },
  submitButton: {
    padding: '14px 32px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: "'Space Mono', monospace",
    background: 'var(--black)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  tableWrapper: {
    background: 'var(--white)',
    border: '1px solid var(--gray-300)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    borderBottom: '1px solid var(--gray-300)'
  },
  tableHeader: {
    padding: '18px 24px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    textAlign: 'left',
    color: 'var(--gray-600)',
    background: 'var(--gray-50)'
  },
  tableHeaderActions: {
    padding: '18px 24px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    textAlign: 'right',
    color: 'var(--gray-600)',
    background: 'var(--gray-50)',
    width: '120px'
  },
  tableRow: {
    borderBottom: '1px solid var(--gray-200)',
    transition: 'background 0.15s ease'
  },
  tableCell: {
    padding: '18px 24px',
    fontSize: '15px',
    fontFamily: "'Space Mono', monospace",
    color: 'var(--gray-700)'
  },
  tableCellDistance: {
    padding: '18px 24px',
    fontSize: '15px',
    fontFamily: "'Space Mono', monospace",
    fontWeight: '600',
    color: 'var(--black)'
  },
  tableCellActions: {
    padding: '18px 24px',
    textAlign: 'right'
  },
  actionButton: {
    padding: '8px 12px',
    marginLeft: '8px',
    fontSize: '16px',
    background: 'transparent',
    border: '1px solid var(--gray-300)',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'var(--gray-600)'
  }
};