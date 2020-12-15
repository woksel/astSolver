const net = require('net')
const spawn = require('child_process').spawn
const fs = require('fs')

const connection = (socket) => {
  console.log('Присоединение')
  socket.on('data', (data) => {
    console.log(data.toJSON())
    fs.writeFileSync('img.txt', data, 'utf-8')
    const pyProcess = spawn('python', [
      'A:\\Python\\openCV\\astSolver\\resolve.py',
    ])
    pyProcess.stdout.pipe(process.stdout)
    pyProcess.stderr.pipe(process.stderr)
    pyProcess.stdout.on('data', (data) => {
      const result = data.toString('utf8')
    })
  })

  socket.on('error', () => {
    console.log('Error client')
  })

  socket.on('close', () => {
    console.log('Отключился')
  })
}

const server = net.createServer()
server.on('connection', connection)

server.on('error', () => {
  console.log('Error')
})
server.listen(3000, 'localhost', () => {
  console.log('Server is running')
})
