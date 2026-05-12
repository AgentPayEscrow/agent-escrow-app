import './globals.css';

export const metadata = {
  title: 'Agent Escrow',
  description: 'AI Agent Payment Platform on Stellar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}