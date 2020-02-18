import Home from './pages/Home/Home'

import NotFound from './components/NotFound/NotFound'

// config
import config from './app.config'

// Basic meta tags
const basicMeta = {
  title: `${config.name}`,
  description: ''
}

const Routes = [
  {
    path: '/',
    exact: true,
    private: false,
    component: Home
  },

  {
    component: NotFound,
    private: true
  }
].map(r => {
  // Merge metadatas
  return Object.assign(
    {},
    {
      metadata: basicMeta
    },
    r
  )
})

export default Routes
