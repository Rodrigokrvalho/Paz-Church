import '../styles/globals.css'
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  return (
    <>
       <header>
        <div className="logo">
          {/* <Image src="https://paz.church/barueri/wp-content/uploads/2019/11/logotop.png" alt="Paz Church | Barueri" width={200} height={50} /> */}
        </div>
      </header> 
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
