const { red, green, blue } = require('chalk')
const Machine = require('./program')
const testLogger = require('./testLogger')
const addRecords = require('./testRecords/record')
const CONTROL = {
  WORD_LEN_MIN: 6, // 限制单词最小长度6
  WORD_LEN_MAX: 11, // 最大长度11
  TEST_TIME_LIMIT: 11 // 最多尝试11次
}
const wordList = getWordList()
const game = Machine(wordList)

launchTest()

function launchTest() {
  const countArg = process.argv[2] // 命令参数
  let count = 0
  if (/count=(\d+)/.test(countArg)) {
    count = RegExp.$1
  }
  let exampleWords = []
  if (count > 0) {
    exampleWords = getRamdonWords(count, wordList) // 随机测试用例
    console.log(blue('执行随机测试...'))
  } else {
    exampleWords = [
      'actinometer',
      'beefsteak',
      'gandhism',
      'heredity',
      'countryseat',
      'elasticity',
      'benumbed',
      'gavotte',
      'causal',
      'outsell'
    ]
    console.log(blue('执行普通测试...'))
  }
  console.log(blue(`测试用例数量：${exampleWords.length}`))
  gameRunner(exampleWords)
}

function gameRunner(exampleWords = []) {
  const start = new Date()
  const stat = { passCount: 0, failCount: 0, allPass: true, failWords: [], passRate: 0 }
  const testResult = exampleWords.map((word, index) => {
    const wordStart = new Date()
    const len = word.length
    const player = game.player(len)
    const results = word.split('').map(source => { // 结果初始化
      return { source, result: '_' }
    })
    let resultText = ''
    let times = 1
    while (times <= CONTROL.TEST_TIME_LIMIT) {
      testLogger.group(`猜测次数${times}`)
      const letter = player.guess()
      testLogger.log('猜测字母=', letter)
      resultText = results.map(item => {
        if (item.source === letter) item.result = letter
        return item.result
      }).join('')
      testLogger.log('猜测结果=', resultText)
      testLogger.groupEnd()
      if (resultText === word) {
        break // 退出
      }
      player.response(resultText)
      times++
    }
    const wordEnd = new Date()
    const wordTime = wordEnd - wordStart
    const output = {
      time: wordTime,
      pass: false,
      times: times
    }
    if (times > CONTROL.TEST_TIME_LIMIT) {
      if (stat.allPass) stat.allPass = false
      stat.failCount++
      stat.failWords.push(word)
      testLogger.log(red(`单词[${word}] 猜测失败，猜测结果：${resultText}`))
    } else {
      output.pass = true
      stat.passCount++
      testLogger.log(green(`单词[${word}] 猜测成功，猜测次数：${times}，耗时：${wordTime}ms`))
    }
    return output
  })
  const end = new Date()
  const totalTime = end - start
  const totalCount = exampleWords.length
  stat.passRate = (stat.passCount / totalCount) * 100
  stat.totalTime = totalTime
  stat.totalCount = totalCount
  if (stat.allPass) {
    console.log(green.bold('=================end================='))
    console.log(green.bold(`全部单词猜测成功，总耗时：${totalTime}ms`))
  } else {
    console.log(red.bold('=================end================='))
    console.log(red.bold(`全部单词猜测失败，总耗时：${totalTime}ms`))
    console.log(red.bold(`猜测成功：${stat.passCount}个`))
    console.log(red.bold(`猜测失败：${stat.failCount}个`))
    console.log(red.bold(`猜测成功率：${stat.passRate.toFixed(2)}%`))
    console.log(red.bold(`猜测失败的单词：`), stat.failWords)
  }
  addRecords(testResult, stat)
}
// 获取词典
function getWordList() {
  const dict = require('./dictionary.json')
  const output = dict.reduce((pre, { en }) => { // 获取词典
    const len = en.length
    const use = len >= CONTROL.WORD_LEN_MIN && len <= CONTROL.WORD_LEN_MAX // 控制单词长度 过短没难度，过长无法猜出
    use && pre.push(en)
    return pre
  }, [])
  return output
}
// 获取随机单词
function getRamdonWords(count = 10, wordList) {
  const list = []
  const indexes = []
  while (count > 0) {
    const index = Math.floor(Math.random() * wordList.length)
    if (indexes.includes(index)) continue
    const word = wordList[index]
    if (word.length < CONTROL.WORD_LEN_MIN) continue // 限制单词长度
    list.push(word)
    indexes.push(index)
    count--
  }
  return list
}
