import Theme from 'vitepress/theme'
import PlayerifyPlugin from '@playerify'
import PlaygroundDemo from './components/PlaygroundDemo.vue'
import './style.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(PlayerifyPlugin)
    app.component('PlaygroundDemo', PlaygroundDemo)
  },
}