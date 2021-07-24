import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from '../../components/Form/Form'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <title>Paz Church - Barueri</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Form />

    </div>
  )
}
