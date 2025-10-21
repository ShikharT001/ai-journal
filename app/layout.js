import './globals.css';

export const metadata = {
  title: 'AI Journal',
  description: 'Personal AI-powered journaling app built with Next.js and MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        style={{
          backgroundColor: '#f9f9f9',
          color: '#333',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ margin: 0 }}>🧠 AI Journal</h2>
        </header>

        <main style={{ flex: 1, padding: '24px' }}>{children}</main>

        <footer
          style={{
            marginTop: '40px',
            padding: '16px',
            borderTop: '1px solid #ddd',
            textAlign: 'center',
            color: '#777',
            backgroundColor: '#fff',
          }}
        >
          <p style={{ margin: '4px 0' }}>
            GitHub:{' '}
            <a
              href="https://github.com/shikharT001"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              ShikharT001
            </a>
          </p>
          <p style={{ margin: '4px 0' }}>
            LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/shikhar-tiwari-b40803222/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              Shikhar Tiwari
            </a>
          </p>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>{"© {new Date().getFullYear()} AI Journal • built by Shikhar Tiwari"}
          </p>
        </footer>
      </body>
    </html>
  );
}
