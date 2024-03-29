import http from "http"

const hostName = 'localhost'
const port = 8080

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Hello, World!\n")
})

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`)
})