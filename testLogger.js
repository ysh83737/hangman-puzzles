// 测试日志
const testLoger = {
  debug: false,
  group(...log) {
    if (!this.debug) return
    console.group(...log)
  },
  groupEnd(...log) {
    if (!this.debug) return
    console.groupEnd(...log)
  },
  log(...log) {
    if (!this.debug) return
    console.log(...log)
  }
}
module.exports = testLoger
