import { chromium } from 'playwright'
import { join } from 'path'
import { mkdir, rm } from 'fs/promises'
import { locales } from '../src/translations/locales'

const buildDir = 'pdfs'

console.log('launching chromium instance')
const browser = await chromium.launch()

const context = await browser.newContext()

console.log('removing pdfs dir')
await rm(buildDir, { recursive: true, force: true })

console.log('creating pdfs dir')
await mkdir(buildDir, { recursive: true })

const originstr = process.env['ORIGIN']

if (!originstr)
    throw Error('ORIGIN is not provided')

const origin = new URL(new URL(originstr).origin)

for (const locale of locales){
    const pdfPath = join(buildDir, `renaud_nzaou_${locale}.pdf`)
    console.log(`generating ${pdfPath}`)
    const page = await context.newPage()
    await page.emulateMedia({
        media: 'screen'
    })
    const url = new URL(origin)
    url.pathname = `/${locale}`
    await page.goto(url.toString())
    const height = await page.evaluate(() => Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    ))
    const width = await page.evaluate(() => Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    ))
    await page.pdf({
        path: pdfPath,
        printBackground: true,
        height,
        width,
        preferCSSPageSize: true,
        pageRanges: '1-1'
    })
}

console.log('closing the browser')
await browser.close()

console.log('done !')