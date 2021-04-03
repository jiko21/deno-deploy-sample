addEventListener('fetch', (event) => {
  event.respondWith(new Response(JSON.stringify({
    message: "hogefuga",
  }, null, 2), {
    headers: { "content-type": "application/json; charset=UTF-8" },
  }))
});
