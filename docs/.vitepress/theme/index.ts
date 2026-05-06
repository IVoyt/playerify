import { h } from 'vue'
import Theme from 'vitepress/theme'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import PlayerifyPlugin from '@playerify'
import './style.css'

const vuetify = createVuetify({
  components,
  directives,
})

export default {
  ...Theme,
  enhanceApp({ app }) {
    Theme.enhanceApp?.(...arguments)
    app.use(vuetify)
    app.use(PlayerifyPlugin)
  },
}