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


async function getBlogData(date: string) {
  const response = await fetch(`https://raw.githubusercontent.com/jiko21/deno-deploy-sample/main/posts/${date}.md`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  return response.text();
}

async function blogPage(date: string) {
  const md = await getBlogData(date);
  const result = flavMd.createFlavMd()
  .readMdText(md)
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
  return `<html>
  <head>
    <title>blog page</title>
  </head>
  <body>
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
  "/blog/:date": async (request, {date}) => {
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return Response.error();
    }
    const post = await blogPage(date);
    return new Response(post, {headers: {
      "content-type": "text-html; charset=UTF-8"
    }})
  },
  404: () => new Response("not found"),
});
