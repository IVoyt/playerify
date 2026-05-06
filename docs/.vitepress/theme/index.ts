import { h } from 'vue'
import Theme from 'vitepress/theme'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import PlayerifyPlugin from '@playerify'
import PlaygroundDemo from './components/PlaygroundDemo.vue'
import './style.css'

const vuetify = createVuetify({
  components,
  directives,
})

const globalComponents = {
  PlaygroundDemo,
}

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(vuetify)
    app.use(PlayerifyPlugin)
    for (const [name, comp] of Object.entries(globalComponents)) {
      app.component(name, comp)
    }
  },
}