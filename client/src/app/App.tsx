import './App.scss';
import AuthedApp from './AuthedApp';
import GuestApp from './GuestApp';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <GuestApp /> */}
      <AuthedApp />
    </>
  );
}

export default App;
