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
        /**
         * 猜测单词内的字母
         * @returns {string}
         */
        guess: function () {
          let letter = ''
          // TODO
          return letter
        },
        /**
         * 接收猜测结果
         * @param {string} result 猜测结果
         */
        response: function (result) {
          // TODO
        }
      };
    }
  };
}
module.exports = Machine
