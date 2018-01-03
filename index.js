const phantom = require('node-phantom-simple')
const phantomjs = require('phantomjs')
const _ = require('lodash')
const ejs = require('ejs')
const fs = require('fs')
const promisify = require('util').promisify

let _session

const createPage = (session, html, pdfPath, option, callback) => {
    session.createPage((err, page) => {
        if (err) {
            throw err
        }

        _.forEach(option, (val, key) => {
            page.set(key, val)
        })

        page.set('content', html, (errSet) => {
            if (errSet) {
                throw errSet
            }
        })

        page.onLoadFinished = function (status) {
            page.render(pdfPath, (error) => {
                page.close()
                page = null
                if (error) {
                    throw err
                }

                callback(null)
            })
        }
    })
}

const createSession = (html, pdfPath, option, callback) => {
    if (_session) {
        createPage(_session, html, pdfPath, option)
    } else {
        phantom.create({
            path: phantomjs.path,
        }, (err, session) => {
            if (err) {
                throw err
            }

            _session = session
            createPage(session, html, pdfPath, option, callback)
        })
    }
}

const pdfMaker = (template, data, pdfPath, option, callback) => {
    const fileExtension = template.split('/').pop().split('.').pop()

    if (fileExtension === 'html') {
        option = pdfPath || {
            paperSize: {
                format: 'A4',
                orientation: 'portrait',
                border: '1.8cm',
            },
        }

        pdfPath = data

        fs.readFile(template, 'utf8', (err, html) => {
            if (err) {
                throw err
            }

            createSession(html, pdfPath, option, callback)
        })
    } else if (fileExtension === 'ejs') {
        if (!data) {
            // console.log('Please provide data object')
            throw new Error('Please provide data object')
        }

        if (!pdfPath) {
            // console.log('Please provide file path of the pdf')
            throw new Error('Please provide file path of the pdf')
        }

        option = option || {
            paperSize: {
                format: 'A4',
                orientation: 'portrait',
                border: '1.8cm',
            },
        }

        fs.readFile(template, 'utf8', (err, file) => {
            if (err) {
                throw err
            }

            const html = ejs.render(file, data)
            createSession(html, pdfPath, option, callback)
        })
    } else {
        // console.log('Unknown file extension')
        throw new Error('Unknown file extension')
    }
}

const pdfMakerAsync = promisify(pdfMaker)

module.exports = pdfMakerAsync

