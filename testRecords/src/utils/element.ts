import { createApp } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/el-table-column.css'

const components = [
  ElTable,
  ElTableColumn
]

export default {
  install(app: ReturnType<typeof createApp>): void {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
