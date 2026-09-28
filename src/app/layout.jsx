import '../index.css';

export const metadata = {
  title: 'SADC Office & Student Council Portal | St. Vincent Pallotti College of Engineering & Technology',
  description: 'Official Student Affairs and Development Cell (SADC) Portal for proposal submissions, activity timelines, gallery archives, and executive governance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAFAF7] text-[#2B2B2B] antialiased">
        {children}
      </body>
    </html>
  );
}
