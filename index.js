const MY_DOMAIN = 'portfolio.helloruru.com'; 
const START_PAGE = 'https://magnetic-cherry-1ce.notion.site/Kaoru-Tsai-2e0ce4a7249b810bba71d607e87a2486';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.hostname === 'www.' + MY_DOMAIN) {
    url.hostname = MY_DOMAIN;
    return Response.redirect(url.href, 301);
  }

  const response = await fetch(`https://www.notion.so${url.pathname}${url.search}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    },
  });

  const body = await response.text();
  const ret = body
    .replace(/www.notion.so/g, MY_DOMAIN)
    .replace(/notion.so/g, MY_DOMAIN)
    .replace(/https:\/\/www.notion.so/g, `https://${MY_DOMAIN}`);

  return new Response(ret, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}
