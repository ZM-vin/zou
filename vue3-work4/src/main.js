import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(VueMarkdownEditor)
app.use(UndrawUi)