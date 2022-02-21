import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { TopMenu } from '../components/TopMenu'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TopMenu />
      <Component {...pageProps} />
    </div>
  ) 
}

export default MyApp
