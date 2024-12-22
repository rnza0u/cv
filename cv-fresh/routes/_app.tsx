import { PageProps } from '../src/requests/typing.ts'

export default function App({ Component, state }: PageProps) {
  return (
    <html lang={state.locale}>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&display=swap'
          rel='stylesheet'
        >
        </link>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <Component />
      </body>
    </html>
  )
}
