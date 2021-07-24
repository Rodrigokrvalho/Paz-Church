import '../styles/globals.css'
import logo from '../../public/logotop.png'
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  return (
    <>
       <header>
        <div className="logo">
          <Image src={logo} alt="Paz Church | Barueri" width={200} height={60} />
        </div>
      </header> 
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
