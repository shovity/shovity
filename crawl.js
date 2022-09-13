const http = require('http')
const fs = require('fs')

const download = (path) => {

    const file = fs.createWriteStream(path)
    const request = http.get(`http://pavlyukpetr.com/projects/wedding-belle/${path}`, (response) => {
        response.pipe(file)

        file.on('finish', () => {
            file.close()
            console.log(`Download Completed - ${path}`)
        })
    })
}

const paths = [
    'fonts/fontawesome-webfont.ttf'
]

paths.forEach(download)