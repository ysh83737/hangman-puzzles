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
      const player = {
        wordList: wordList.filter(w => w.length === wordLen),
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
          const counter = {}
          const max = { letter: '', count: 0 }
          this.wordList = this.wordList.filter(word => {
            const execRes = reg.exec(word)
            if (!execRes) return
            const letters = execRes.length === 1 ? word.split('') : execRes.slice(1, execRes.length).join('').split('')
            letters.forEach(letter => {
              let count = counter[letter]
              if (!count) count = 0
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
          this.guessed.push(max.letter)
          return max.letter
        },
        /**
        * 接收猜测结果
        * @param {string} result 猜测结果
        */
        response: function (result) {
          this.result = result
        }
      }
      player.guess = player.guess.bind(player)
      player.response = player.response.bind(player)
      return player
    }
  };
}
module.exports = Machine
