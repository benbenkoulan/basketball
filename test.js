var reg = /(\.json)$/
var str1 = 'data/games.json'
var str2 = 'data/games'

console.log(reg.test(str1))
console.log(reg.test(str2))