import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <title>Paz Church - Barueri</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <h1>Home</h1>
        <Link href="/cadastro">
          <a>Cadastre-se</a>
        </Link>
      </main>

    </div>
  )
}
