import RideApp from './RideApp';
import RayAdminApp from './RayAdminApp';

function App() {
  const isAdmin = window.location.pathname === '/admin';
  return isAdmin ? <RayAdminApp /> : <RideApp />;
}

export default App;