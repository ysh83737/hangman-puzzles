# hangman-puzzles
这是一个从`codewars`上碰到的解密题目，名为[Hangman - Puzzles #7](https://www.codewars.com/kata/5761bb4f3665fe9315000003/javascript)，我用更大的本地词典来复刻此题目，并做了性能和通过率的统计，相较于原题目难度更大。

如果要挑战这个题目，遵照以下2个步骤：
- 修改解密程序`program.js`
- 运行测试脚本
> `npm run test` 运行普通测试脚本，只测试固定的10个用例  
> `npm run full` 运行随机测试脚本，测试随机的500个用例（也可以自行修改测试更多）

如果能够最终通过测试，并且`猜测成功率`达到100%，则证明你的破解程序是完美的

```js
// program.js

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
```
