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
        <main style={{ padding: '24px' }}>{children}</main>
        <footer
          style={{
            marginTop: '40px',
            padding: '16px',
            borderTop: '1px solid #ddd',
            textAlign: 'center',
            color: '#777',
          }}
        >
          <p>© {new Date().getFullYear()} AI Journal • Powered by Next.js & MongoDB</p>
        </footer>
      </body>
    </html>
  );
}
