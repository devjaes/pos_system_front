import type { NextPage } from 'next'

import Navegador from '@/components/Navegador'
import Hiro from '@/components/Hiro'
import Footer from '@/components/Footer'
import SideNav from '@/components/SideNav'


const HomePage: NextPage = () => (
  <>
    <Navegador />
    <Hiro />
    <Footer />
    <SideNav />


    <style jsx>
      {`
        

          .mainHeader {
          display: flex;
          justify-content: center;
          flex-direction: row;
          background-image: url('https://img.freepik.com/vector-gratis/fondo-dia-internacional-gato-acuarela_23-2149506124.jpg?w=2000');
          background-size: cover;
          
        }
        .mainHeader__icon, .mainHeader__text {
          flex: 1;
        }
        
        .contenedor{
          max-width: 1200px;
          margin: 0 auto;
        }

      

      `}
    </style>
  </>
)

export default HomePage
