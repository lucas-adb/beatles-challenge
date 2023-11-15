import './App.css';
import { useStore } from './store/gameStore';

function App() {
  const { count, inc } = useStore();

  return (
    <>
      <div>
        <h1>zustand</h1>
        <div>
          <span>{count}</span>
          <button onClick={inc}>one up</button>
        </div>
      </div>
    </>
  );
}

export default App;
