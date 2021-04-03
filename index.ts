import { serve } from "https://deno.land/x/sift/mod.ts";

const index = `<html>
  <head>
    <title>index page</title>
  </head>
  <body>
    <h1>This is top page</h1>
  </body>
</html>`;

function blogPage(slug: string) {
  return `<html>
  <head>
    <title>blog page</title>
  </head>
  <body>
    <h1>Hello ${slug}</h1>
  </body>
</html>`;
}

serve({
  "/": ()=> new Response(index, {
    headers: {
      "content-type": "text-html; charset=UTF-8"
    },
  }),
  "/blog/:slug": (request, {slug}) => {
    const post = blogPage(slug);
    return new Response(post, {headers: {
      "content-type": "text-html; charset=UTF-8"
    }})
  },
  404: () => new Response("not found"),
});
