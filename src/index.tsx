import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import store from './app/store/store'

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
)
