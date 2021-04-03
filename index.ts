import { serve } from "https://deno.land/x/sift/mod.ts";
import flavMd from 'https://cdn.skypack.dev/flav-md';



const index = `<html>
  <head>
    <title>index page</title>
  </head>
  <body>
    <h1>This is top page</h1>
  </body>
</html>`;


async function getBlogData() {
  const response = await fetch('https://raw.githubusercontent.com/jiko21/deno-deploy-sample/main/posts/2021-04-03.md', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.text();
}

async function blogPage(slug: string) {
  const md = await getBlogData();
  const result = flavMd.createFlavMd()
  .readMdText(md)
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
  return `<html>
  <head>
    <title>blog page</title>
  </head>
  <body>
    <h1>Hello ${slug}</h1>
    ${result}
  </body>
</html>`;
}

serve({
  "/": ()=> new Response(index, {
    headers: {
      "content-type": "text-html; charset=UTF-8"
    },
  }),
  "/blog/:slug": async (request, {slug}) => {
    const post = await blogPage(slug);
    return new Response(post, {headers: {
      "content-type": "text-html; charset=UTF-8"
    }})
  },
  404: () => new Response("not found"),
});
