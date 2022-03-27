import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <link rel='apple-touch-icon' href='/static/images/logo.png' />
          <link rel='icon' type='image/png' href='/static/images/logo.png' />
          <link rel='manifest' href='/static/favicons/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta name='theme-color' content='#000000' />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
        </Head>
        <body className='bg-white text-black antialiased dark:bg-gray-900 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
