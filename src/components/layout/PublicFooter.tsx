import Link from 'next/link';

export const PublicFooter = () => {
  return (
    <footer style={{
      backgroundColor: '#111128',
      borderTop: '1px solid rgba(74, 74, 106, 0.3)',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ffc600, #ff005d)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>E</span>
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#f1f0ff' }}>EventSync</span>
            </div>
            <p style={{ color: '#8b8aaa', fontSize: '0.875rem' }}>
              La plateforme moderne pour vos événements d'entreprise
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontWeight: '600', color: '#f1f0ff', marginBottom: '1rem' }}>Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Accueil
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/events" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/speakers" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Intervenants
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ fontWeight: '600', color: '#f1f0ff', marginBottom: '1rem' }}>Ressources</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="#" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  À propos
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="#" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" style={{ color: '#8b8aaa', textDecoration: 'none', fontSize: '0.875rem' }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 style={{ fontWeight: '600', color: '#f1f0ff', marginBottom: '1rem' }}>Suivez-nous</h3>
            <div style={{ display: 'flex', gap: '1rem', color: '#8b8aaa' }}>
              <span style={{ cursor: 'pointer' }}>GitHub</span>
              <span style={{ cursor: 'pointer' }}>Twitter</span>
              <span style={{ cursor: 'pointer' }}>LinkedIn</span>
              <span style={{ cursor: 'pointer' }}>Email</span>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(74, 74, 106, 0.3)',
          textAlign: 'center',
          color: '#4a4a6a',
          fontSize: '0.875rem'
        }}>
          <p>&copy; {new Date().getFullYear()} EventSync. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};