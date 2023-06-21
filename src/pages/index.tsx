import type { NextPage } from 'next'
import Head from 'next/head'

import { InputTextComponent } from '@/components/InputTextComponent'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>My pos system</title>
      <link rel="icon" href="/favicon.ico" />
      <h1 className="text-4xl font-bold">My pos system</h1>
    </Head>
    <header className="flex justify-center items-center p-4">
      <div className="flex items-center space-x-2">
        <IconWrappedComponent icon="CHEVRON_DOWN" />
        <h2 className="ml-4 whitespace-nowrap">My pos system</h2>
      </div>
      <div className="flex items-center">
        <IconWrappedComponent icon="MAIL" />
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
  </>
)

export default HomePage
