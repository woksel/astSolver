const fs = require('fs')
const fileContent = fs.readFileSync('vsp-02.txt', 'utf8')
const questions = fileContent.match(/S:.*/g).map((val) => {
  return val.replace('S:', '')
})
const answers = fileContent.match(/\+:.*/g).map((val) => {
  return val.replace('+:', '')
})
console.log(questions.length)
console.log(answers.length)
const result = []
for (let i = 0; i < questions.length; i++) {
  result.push(`{"${questions[i]}" : "${answers[i]}"}`)
}
fs.writeFileSync('result1.txt', '[' + result.join() + ']')
