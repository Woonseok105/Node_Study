import http from "http";
import url from "url";
import querystring from "querystring";

const server = http.createServer((req, res) => {
    console.log('---log start---')

    const parsedUrl = url.parse(req.url)
    console.log(parsedUrl)

    const parsedQuery = querystring.parse(parsedUrl.query,'&', '=')
    console.log(parsedQuery)

    console.log('---log end---')

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    // res.end('Hello node.js')
    res.end(`var1의 값은 ${parsedQuery.var1}`)
})

server.listen(8080, () => {
    console.log(`Server is running...`)
})