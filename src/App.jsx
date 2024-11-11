import { useState, useEffect } from 'react';
import appFirebase from '../src/credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import _Login from '../src/components/_Login';
import NavBar from '../src/components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
     <Router>
      <Routes>
        <Route path="/" element={<_Login />} />
        <Route path="/Home" element={<NavBar />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;
