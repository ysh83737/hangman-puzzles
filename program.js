/**
 * 目标：实现一个猜单词游戏模型
 * 猜测条件：(1)词典；(2)单词长度
 * 猜测过程：guess方法返回1个字母，response方法会接收到猜测结果，根据此结果，再次猜测下一个字母，直到猜出整个单词
 * 限制：最多猜测11次
 * 
 * 举例：要猜的单词：piggy
 * guess: i
 * response: _i___
 * 
 * guess: a
 * response: _i___
 * 
 * guess: g
 * response: _igg_
 * 
 * 以此类推。
 * 猜测结果会包含字母位置信息，未猜出的字母以下划线表示
 */

/**
 * 游戏生成
 * @param {string[]} wordList 词典
 * @returns {object}
 */
function Machine(wordList) {
  return {
    /**
     * 玩家生成器
     * @param {number} wordLen 单词长度
     * @returns {object} 玩家对象
     */
    player: function (wordLen) {
      return {
        restWordList: wordList.filter(w => w.length === wordLen),
        guessed: [],
        result: '_'.repeat(wordLen),
        /**
         * 猜测单词内的字母
         * @returns {string}
         */
        guess: function () {
          const exLetters = this.guessed.join('')
          const regText = this.result.replace(/_+/g, w => `([^${exLetters}]{${w.length}})`)
          const reg = new RegExp(regText)
          const positionCounter = [] // 各个缺口位置的统计
          this.result.split('').forEach((symbol, position) => {
            if (symbol === '_') {
              positionCounter.push({
                position,
                max: { letter: '', count: 0 },
                letterCount: 0,
                counter: {}
              })
            }
          })
          this.restWordList = this.restWordList.filter(word => {
            const execRes = reg.exec(word)
            if (!execRes) return
            positionCounter.forEach(stator => {
              const { position, max, counter } = stator
              const letter = word[position]
              let count = counter[letter]
              if (!count) {
                count = 0
                stator.letterCount++
              }
              count++
              counter[letter] = count
              if (!max.letter) max.letter = letter
              if (count > max.count) {
                max.letter = letter
                max.count = count
              }
            })
            return true
          })
          const statMin = positionCounter.reduce((min, cur) => {
            if (cur.letterCount < min.letterCount) min = cur
            return min
          }, { letterCount: Infinity })
          const guessLetter = statMin.max.letter
          this.guessed.push(guessLetter)
          return guessLetter
        },
        /**
         * 接收猜测结果
         * @param {string} result 猜测结果
         */
        response: function (result) {
          this.result = result
        }
      };
    }
  };
}
module.exports = Machine
