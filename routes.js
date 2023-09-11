const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>First Node Task</title></head>')
        res.write('<body>')
        res.write('<h1>Bonjour folks!!!</h1>')
        res.write('<form action = "/create-user" method = "POST"><input type = "text" name = "userName"><button type = "submit">Click Me!</button></form>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>List of Users tab</title></head>')
        res.write('<body><ul><li><h1>User 1</h1></li></ul></body>')
        res.write('</html>')
        res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
            console.log(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            res.statusCode = 302;
            res.setHeader('Location', '/');

            console.log(parsedBody)
            const message = parsedBody.split('=')[1]

            console.log(message)
            return res.end()
        })
    }
}

module.exports = requestHandler;