import { useState } from 'react';
import './App.css';
import ColorConverter from './converter';
import TrainingLog from './traning';

function App() {
  const [activeTask, setActiveTask] = useState('converter');

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={activeTask === 'converter' ? 'active' : ''}
          onClick={() => setActiveTask('converter')}
        >
          Конвертер HEX → RGB
        </button>
        <button
          className={activeTask === 'training' ? 'active' : ''}
          onClick={() => setActiveTask('training')}
        >
          Учёт тренировок
        </button>
      </div>

      <div className="task-content">
        {activeTask === 'converter' && <ColorConverter />}
        {activeTask === 'training' && <TrainingLog />}
      </div>
    </div>
  );
}

export default App;