//Custom styles all in one page.
import './App.css';
//Getting all the components from the components folder and rendering them out.
import LetterSelector from './components/LetterSelector';
import HangingMan from './components/HangingMan';
import UserProgressDisplay from './components/UserProgressDisplay';
import WinScreen from './components/WinScreen';
import HowToPlay from './components/HowToPlay';


function App() {
  return (
    <div className="App">
      <HangingMan />
      <UserProgressDisplay />
      <LetterSelector />
      <HowToPlay />
      <WinScreen />
    </div>
  );
}

export default App;
