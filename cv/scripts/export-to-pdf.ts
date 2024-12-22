/// <reference lib="dom" />

import { chromium } from 'playwright'
import { join } from '@std/path'
import { exists } from '@std/fs'
import { locales } from '../src/translations/locales.ts'

const buildDir = 'pdfs'

console.log('launching chromium instance')
const browser = await chromium.launch()

const context = await browser.newContext()

console.log('removing pdfs dir')
if (await exists(buildDir, { isDirectory: true }))
  await Deno.remove(buildDir, { recursive: true })

console.log('creating pdfs dir')
await Deno.mkdir(buildDir, { recursive: true })

console.log('waiting for server...')

let tries = 0
const maxTries = 10

while (true){
  try {
    tries++
    using _connection = await Deno.connect({
      hostname: 'localhost',
      port: 23000
    })
    break
  } catch (_){
    console.log(`waiting for server to accept connections (${tries} trie(s))...`)
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
  if (tries === maxTries){
    throw Error(`could not reach server after ${tries} trie(s)`)
  }
}

for (const lang of locales){
    const pdfPath = join(buildDir, `renaud_nzaou_${lang}.pdf`)
    console.log(`generating ${pdfPath}`)
    const page = await context.newPage()
    await page.emulateMedia({
        media: 'screen'
    })
    
    // fix for connection reset on ubuntu with deno
    await page.waitForLoadState('networkidle')

    await page.goto(`http://localhost:23000/${lang}`)
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