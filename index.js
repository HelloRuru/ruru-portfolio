const MY_DOMAIN = 'portfolio.helloruru.com';
// 2e0ce4a7249b810bba71d607e87a2486
const START_PAGE_ID = '2e0ce4a7249b810bba71d607e87a2486'; 

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // 處理 www 轉址
  if (url.hostname === 'www.' + MY_DOMAIN) {
    return Response.redirect(`https://${MY_DOMAIN}${url.pathname}`, 301);
  }

  let fullPath = url.pathname + url.search;

  // 關鍵修正：如果是首頁，強制指向你的 Page ID
  if (url.pathname === '/' || url.pathname === '') {
    fullPath = `/${START_PAGE_ID}`;
  }

  // 修改發送給 Notion 的請求
  const notionUrl = `https://www.notion.so${fullPath}`;
  
  const response = await fetch(notionUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'n-notion-version': '2023-01-01' // 有助於穩定抓取
    },
  });

  // 取得 Notion 原始內容並替換網址
  let body = await response.text();
  body = body.replace(/www.notion.so/g, MY_DOMAIN)
             .replace(/notion.so/g, MY_DOMAIN);

  return new Response(body, {
    headers: {
      'content-type': response.headers.get('content-type'),
      'cache-control': 'public, max-age=3600'
    },
    status: response.status
  });
}