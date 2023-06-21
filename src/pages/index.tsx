import type { NextPage } from 'next'

import { InputTextComponent } from '@/components/InputTextComponent'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'
import {
  DropdownComponent,
  IDropdownOption,
} from '@/components/DropdownComponent'

const options: IDropdownOption[] = [
  {
    label: 'Tennis',
    value: 1,
  },
  {
    label: 'Basket',
    value: 2,
  },
  {
    label: 'Soccer',
    value: 3,
  },
]

const HomePage: NextPage = () => (
  <>
    <div className="p-12 flex flex-col gap-4">
      <InputTextComponent
        id="input"
        name="inputFoo"
        placeholder="foo"
        onChange={() => null}
      />

      <InputTextComponent
        id="input"
        name="inputFoo"
        placeholder="foo"
        value="bar"
        leading={
          <IconWrappedComponent
            icon="MAIL"
            role="leading-icon"
            className="h-5 w-5 text-indigo-300"
          />
        }
        labelText="Some label"
        onChange={() => null}
      />

      <InputTextComponent
        id="input"
        name="inputFoo"
        placeholder="foo"
        value="bar"
        variant="danger"
        leading={
          <IconWrappedComponent
            icon="MAIL"
            role="leading-icon"
            className="h-5 w-5 text-indigo-300"
          />
        }
        trailing={
          <IconWrappedComponent
            icon="MAIL"
            role="leading-icon"
            className="h-5 w-5 text-indigo-300"
          />
        }
        labelText="Some label"
        onChange={() => null}
      />

      <InputTextComponent
        id="input"
        name="inputFoo"
        placeholder="foo"
        value="bar"
        variant="secondary"
        leading="$"
        trailing={
          <IconWrappedComponent
            icon="MAIL"
            role="leading-icon"
            className="h-5 w-5 text-indigo-300 mr-2"
          />
        }
        labelText="Some label"
        onChange={() => null}
      />
    </div>
    <div className="flex flex-row gap-28 justify-center p-14">
      <DropdownComponent
        value={1}
        onChange={() => null}
        options={options}
        placeholder="pick an option"
        iconHeader="MAIL"
        variant="secondary"
        includeDividers={true}
      >
        {(option) => (
          <>
            <IconWrappedComponent
              icon="MAIL"
              role="leading-icon"
              className="h-5 w-5 text-indigo-300 mr-2"
            />

            {option.label}
          </>
        )}
      </DropdownComponent>

      <DropdownComponent
        value={2}
        onChange={() => null}
        options={options}
        placeholder="pick an option"
      >
        {(option) => (
          <>
            <IconWrappedComponent
              icon="MAIL"
              role="leading-icon"
              className="h-5 w-5 text-indigo-300 mr-2"
            />

            {option.label}
          </>
        )}
      </DropdownComponent>

      <DropdownComponent
        value={3}
        onChange={() => null}
        options={options}
        variant="danger"
        placeholder="pick an option"
        includeDividers={true}
      >
        {(option) => <>{option.label}</>}
      </DropdownComponent>
    </div>
  </>
)

export default HomePage
