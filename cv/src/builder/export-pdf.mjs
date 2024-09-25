import { chromium } from 'playwright'
import { join } from 'path'
import { mkdir, rm } from 'fs/promises'

const langs = ['en', 'fr']
const buildDir = 'pdfs'

console.log('launching chromium instance')
const browser = await chromium.launch()

const context = await browser.newContext()

console.log('removing pdfs dir')
await rm(buildDir, { recursive: true, force: true })

console.log('creating pdfs dir')
await mkdir(buildDir, { recursive: true })

for (const lang of langs){
    const pdfPath = join(buildDir, `renaud_nzaou_${lang}.pdf`)
    console.log(`generating ${pdfPath}`)
    const page = await context.newPage()
    await page.emulateMedia({
        media: 'screen'
    })
    await page.goto(`http://localhost:23000/${lang}/index.html`)
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