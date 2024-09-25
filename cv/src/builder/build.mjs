import Handlebars from 'handlebars'
import { mkdir, readFile, rm, writeFile, cp } from 'fs/promises'
import { join } from 'path'

const langs = ['en', 'fr']

const template = Handlebars.compile(await readFile('src/templates/index.handlebars', 'utf-8'), {
    noEscape: true,
    strict: true,
})
const target = (() => {
    const value = process.env['CV_TARGET']
    switch (value){
        case 'web':
        case undefined:
            return 'web'
        case 'pdf':
            return 'pdf'
    }
    throw Error(`unknown build target ${value}`)
})()

Handlebars.registerHelper('isWeb', function(){
    return target === 'web'
})

const buildDir = `build/${target}`

console.log(`building for target "${target}"`)

console.log(`removing build directory`)
await rm(buildDir, { force: true, recursive: true })

for (const lang of langs){
    console.log(`rendering ${lang}/index.html`)
    const translations = JSON.parse(await readFile(`src/translations/${lang}.json`))
    const rendered = template(
        {
            lang,
            target,
            i18n: translations
        }
    )
    const outDir = join(buildDir, lang)
    await mkdir(outDir, {
        recursive: true
    })
    await writeFile(join(outDir, 'index.html'), rendered)
}

console.log('copying website assets...')
await cp('src/website', buildDir, {
    recursive: true,
    force: true
})

console.log('build done')