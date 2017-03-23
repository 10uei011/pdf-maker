# pdf-maker
An easy way to generate pdf files from ejs templates or html files


##Install

```js
npm i --save pdf-maker
```

##Usage

##For generating pdf from ejs templates

```js
var pdfMaker = require('pdf-maker');

var template = 'path/to/ejsTemplate.ejs';
var data = {
    name: 'node.js'
};
var pdfPath = '/path/of/pdf/file.pdf';
var option = {
    {
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '1.8cm'
        }
    };
};

pdfMaker(template, data, pdfPath, option);
```

Here, 'option' parameter is optional.
'data' is the data which will be used in the ejs template.
'pdfPath' is the path with where the pdf file will be saved.


##For generating pdf from html files.

```js
var pdfMaker = require('pdf-maker');

var template = 'path/to/htmlFile.html';
var pdfPath = '/path/of/pdf/file.pdf';
var option = {
    {
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '1.8cm'
        }
    };
};

pdfMaker(template, pdfPath, option);
```

##Roadmap

Adding test cases.
Removing external dependencies.