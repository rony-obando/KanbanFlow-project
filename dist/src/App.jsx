import { useState, useEffect } from 'react';
import appFirebase from '../src/credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import _Login from './pages/_Login';
import NavBar from '../src/components/NavBar';
import _createSW from '../src/pages/createSW'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../src/contexts/userContext"; // Importa el UserProvider


const auth = getAuth(appFirebase);

function App() {
  const [userapp, setuser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setuser(firebaseUser);
      } else {
        setuser(null);
      }
    });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  return (
   <div>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<_Login />} />
        <Route path="/Home" element={<_createSW />} />
      </Routes>
    </Router>
    </UserProvider>
   </div>
  );
}

export default App;
