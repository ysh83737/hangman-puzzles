const fs = require('fs')
const { resolve } = require('path')
const { red } = require('chalk')
const recordsPath = resolve(__dirname, './records.json') || []
const records = require(recordsPath)

/**
 * 添加测试记录
 * @param {{ time: number, pass: boolean, times: number }[]} results 测试结果
 * @param {number} time 耗时
 * @param {boolean} pass 是否通过
 * @param {number} times 猜测次数
 * @param {{ passCount: number, failCount: number, allPass: boolean, failWords: string[], passRate: number, totalTime: number, totalCount: number }} stat 整体统计结果
 */
function addRecords(results, stat) {
  const { allPass, passCount, failCount, passRate, totalTime, totalCount } = stat
  const newRecord = {
    timeStamp: new Date().valueOf(),
    allPass,
    passCount,
    failCount,
    totalCount,
    passRate,
    totalTime
  }
  const sums = results.reduce((pre, { pass, time, times }) => {
    pre.timeAll += time
    if (pass) {
      pre.timeOfPass += time
      pre.timesOfPass += times
    }
    return pre
  }, { timeAll: 0, timeOfPass: 0, timesOfPass: 0 })
  newRecord.averageTimeAll = sums.timeAll / totalCount // 全部平均耗时
  newRecord.averageTimeOfPass = sums.timeOfPass / passCount // 成功的平均耗时
  newRecord.averageTimesOfPass = sums.timesOfPass / passCount // 成功的平均次数
  records.push(newRecord)
  storage(records)
}
function storage(json) {
  const data = JSON.stringify(json)
  fs.writeFile(recordsPath, data, err => {
    if (err) {
      console.log(red('写入测试记录文件失败！', err.message))
    }
  })
}
module.exports = addRecords
