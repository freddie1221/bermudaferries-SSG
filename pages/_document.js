import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
<Head>
  <meta name="description" content="The Bermuda Ferry Schedule - Find real-time updates, routes, and timetables for all Bermuda ferry services." />
  <meta name="keywords" content="Bermuda ferries, ferry schedule, Bermuda transportation, Hamilton ferry, Paget ferry, Warwick ferry, Somerset ferry, Sandys ferry, Dockyard ferry, ferry schedule summer 2025" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" href="/icons/icon-192x192.png" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  <meta name="theme-color" content="#000000" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;