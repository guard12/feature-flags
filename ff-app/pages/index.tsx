import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Feature flags</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white">
          <div className="lg:text-center">
            <h1 className="text-3xl font-bold text-gray-900">Coinify Feature Flags</h1>
          </div>
        </header>
    </div>
  )
}

export default Home
