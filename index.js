addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 直接跳轉到您的公開 Notion 網址
  const destinationURL = "https://magnetic-cherry-1ce.notion.site/Kaoru-Tsai-2e0ce4a7249b810bba71d607e87a2486";
  
  return Response.redirect(destinationURL, 301);
}
