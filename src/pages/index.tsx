import type { NextPage } from 'next'

import Navegador from '@/components/Navegador'
import Hiro from '@/components/Hiro'
import Footer from '@/components/Footer'
import Table from '@/components/Table'
import { Loading } from '@/components/Loading'

const HomePage: NextPage = () => (
  <>
<<<<<<< HEAD
    <Navegador />
    <Hiro />
    <Footer />
    <Table
      headings={[
        'id',
        'mainCode',
        'AuxCode',
        'description',
        'Amount',
        'UnitPrice',
        'Discount',
        'Total sin impuestos',
      ]}
      data={['1', '1', '1', '1', '1', '1', '1', '1']}
    />
    <Loading />


=======
    <Head>
      <title>My pos system</title>
      <link rel="icon" href="/favicon.ico" />
      <h1 className="text-4xl font-bold">My pos system</h1>
    </Head>
    <header className="mainHeader">
      <div>
        <div className="mainHeader__icon">
          <IconWrappedComponent icon="CHEVRON_DOWN" />
        </div>
        <div className="mainHeader__text">
          <h2>My pos system</h2>
        </div>
      </div>
    </header>
    <main className="p-12">
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1">
          <InputTextComponent
            id="username"
            name="username"
            labelText="Username"
            placeholder="Username"
            onChange={() => {}}
          />
        </div>
        <div className="col-span-1">
          <InputTextComponent
            id="password"
            name="password"
            labelText="Password"
            placeholder="Password"
            onChange={() => {}}
          />
        </div>
      </div>
    </main>
>>>>>>> 1fee47a (a)
    <style jsx>
      {`
        .mainHeader {
          display: flex;
          justify-content: center;
          flex-direction: row;
          background-image: url('https://img.freepik.com/vector-gratis/fondo-dia-internacional-gato-acuarela_23-2149506124.jpg?w=2000');
          background-size: cover;
        }
        .mainHeader__icon,
        .mainHeader__text {
          flex: 1;
<<<<<<< HEAD
        }

        .contenedor {
          max-width: 1200px;
          margin: 0 auto;
=======
>>>>>>> 1fee47a (a)
        }
      `}
    </style>
  </>
)

export default HomePage
