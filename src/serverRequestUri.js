import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
    console.log(req.url)

    const parsedUrl = url.parse(req.url)

    const resource = parsedUrl.pathname
    console.log(`resource path=${resource}`)

    if (resource === '/address') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end('서울특별시')
    } else if (resource === '/phone') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end('010-1234-1234')
    } else if (resource === '/name') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end('name')
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 Page Not Found')
    }
})

server.listen(8080, () => {
    console.log('Server is Running...')
})