var phantom = require("node-phantom-simple");
var phantomjs = require('phantomjs');
var _ = require('lodash');
var ejs = require('ejs');
var fs = require('fs');


function pdfMaker(template, data, pdfPath, option) {

    var fileExtension = template.split('/').pop().split('.').pop();

    if (fileExtension === 'html') {
        option = pdfPath || {
                paperSize: {
                    format: 'A4',
                    orientation: 'portrait',
                    border: '1.8cm'
                }
            };

        pdfPath = data;

        fs.readFile(template, 'utf8', function (err, html) {
            if (err) {
                throw err;
            }

            generatePdf(html, pdfPath, option);

        });

    } else if (fileExtension === 'ejs') {
        if (!data) {
            console.log('Please provide data object');
        }

        if (!pdfPath) {
            console.log('Please provide file path of the pdf');
        }

        option = option || {
                paperSize: {
                    format: 'A4',
                    orientation: 'portrait',
                    border: '1.8cm'
                }
            };

        fs.readFile(template, 'utf8', function (err, file) {
            if (err) {
                throw err;
            }

            var html = ejs.render(file, data);
            generatePdf(html, pdfPath, option);
        });

    } else {
        console.log('Unknown file extension')
    }
}

function generatePdf(html, pdfPath, option) {
    phantom.create({
        path: phantomjs.path
    }, function (err, session) {
        if (err) {
            throw err;
        }

        session.createPage(function (err, page) {
            if (err) {
                throw err;
            }

            _.forEach(option, function (val, key) {
                page.set(key, val);
            });

            page.set('content', html, function (err) {
                if (err) {
                    throw err;
                }
            });

            page.onLoadFinished = function (status) {
                page.render(pdfPath, function (error) {
                    page.close();
                    page = null;
                    if (error) {
                        throw err;
                    }
                });
            };
        })
    });
}

module.exports = pdfMaker;

