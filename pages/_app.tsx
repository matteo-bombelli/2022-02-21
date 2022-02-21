import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/">React frontend Version</Link></li>
          <li><Link href="/be-filtering">Filtering on the nodejs server</Link></li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  ) 
}

export default MyApp
