import http from "http";
import querystring from "querystring";

const server = http.createServer((req, res) => {
    let postData = ''

    req.on('data', (data) => {
        postData = postData + data
    })

    req.on('end', () => {
        const parsedQuery = querystring.parse(postData)

        console.log(parsedQuery)

        res.statusCode = 200
        res.setHeader('contentType', 'test/html')
        res.end(`var1의 값 ${parsedQuery.var1}`)
    })
})

server.listen(8080, () => {
    console.log(`server is running...`)
})