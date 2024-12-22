export function redirect(path: string): Response {
  return new Response('', {
    status: 302,
    headers: {
      'Location': path,
    },
  })
}
