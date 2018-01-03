const ejs = require('ejs')
const pdfMaker = require('./index')
 
const template = './template/contracheque.ejs';
const data = {
    company: 'Empresa de Empreendimentos',
    cnpj: '11.111.111/0001-79',
    date: '11/2017',
    register: 123456789,
    name: 'Love is a magic',
    emmitDate: '11/2017',
    job: 'Desenvolvedor Koruja Sofware Studios',
    ctps: '00000000/0000-00',
    place: 'Av. Humberto Monte, 2929 - Pici, Fortaleza - CE, 60440-593, 402B Torre Sul.',
    pay: 'R$ 99.440,57',
    baseFGTS: 'R$ 99.996,00',
    baseIR: 'R$ 999,00',
    totalEarnings: 'R$ 99.440,57',
    totalOff: 'R$ 999,30',
    fgts: 'R$ 9999,00',
    contribution: 'R$ 99,00',
    netValue: 'R$ 99.440,57',
    message: 'Omae wa mou shindeiru..... NANI!!??',
    details: [
        {
            code: 101,
            type: '',
            reference: '25D',
            earnings: 'R$ 3.540,60',
            off: '2.4%'
        },
        {
            code: 102,
            type: 'Salário',
            reference: '28D',
            earnings: 'R$ 4.140,60',
            off: '1.2%'
        },
        {
            code: 105,
            type: 'INSS',
            reference: '20D',
            earnings: 'R$ 140,60',
            off: '0.5%'
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
    ]
}
const pdfPath1 = './file1.pdf';
const pdfPath2 = './file2.pdf';

const option = {
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '0cm'
        }
}

const execTest = async (asyncMode) => {
    const d1 = new Date()
    let d2

    if(asyncMode) {
        console.log('- With async mode')
        await pdfMaker(template, data, pdfPath1, option)
        d2 = new Date()
    } else {
        console.log('- Without async mode')
        pdfMaker(template, data, pdfPath2, option)
        d2 = new Date()
    }

    console.log('  Time elapsed: ' + (d2-d1) + ' milliseconds')
}

execTest(false)
execTest(true)