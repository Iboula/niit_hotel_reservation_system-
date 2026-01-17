import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Debug: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.clear();
    alert('localStorage vidé! Veuillez vous reconnecter.');
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔍 Page de Debug</h1>
      
      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h2>État d'authentification</h2>
        <p><strong>Connecté:</strong> {isAuthenticated ? 'Oui ✓' : 'Non ✗'}</p>
        <p><strong>Est Admin:</strong> {isAdmin ? 'Oui ✓' : 'Non ✗'}</p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h2>Données utilisateur</h2>
        <pre style={{ background: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h2>localStorage</h2>
        <pre style={{ background: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify({
            token: localStorage.getItem('token'),
            user: localStorage.getItem('user')
          }, null, 2)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={clearLocalStorage}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🗑️ Vider localStorage
        </button>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Retour à l'accueil
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Instructions</h3>
        <ol>
          <li>Vérifiez que les données utilisateur contiennent firstName et lastName</li>
          <li>Vérifiez que le rôle est bien "ADMIN" pour les administrateurs</li>
          <li>Si les données sont incorrectes, cliquez sur "Vider localStorage" et reconnectez-vous</li>
        </ol>
      </div>
    </div>
  );
};

export default Debug;
