import mustache from 'mustache'
import { mkdir, readFile, rm, writeFile, cp } from 'fs/promises'
import { join } from 'path'

const buildDir = 'build'
// first language is default
const langs = ['en', 'fr']
const template = await readFile('src/templates/index.mustache', 'utf-8')

console.log(`removing build directory`)
await rm(buildDir, { force: true, recursive: true })

for (const lang of langs){
    console.log(`rendering ${lang}/index.html`)
    const translations = JSON.parse(await readFile(`src/translations/${lang}.json`))
    const rendered = mustache.render(
        template, 
        {
            lang,
            i18n: translations
        }, 
        undefined, 
        {
            escape: s => s
        }
    )
    const outDir = join(buildDir, lang)
    await mkdir(outDir, {
        recursive: true
    })
    await writeFile(join(outDir, 'index.html'), rendered)
}

console.log('copying website assets...')
await cp('src/website', 'build', {
    recursive: true,
    force: true
})

console.log('build done')