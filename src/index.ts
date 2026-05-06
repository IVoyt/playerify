import { Plugin } from 'vue'
import Playerify from '@playerify/components/Playerify.vue'

interface PackageOptions {
  locale?: string;
}

const PlayerifyPlugin: Plugin = {
  install(app, options: PackageOptions = {}) {
    app.component('Playerify', Playerify)
  }
}

export { Playerify }
export default PlayerifyPlugin