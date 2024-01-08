---
layout: post
title: "Next.js Netlify 배포 이슈"
summary: "SPA가 아닌 프로젝트 배포"
author: dahoon06
date: "2023-11-16 00:00:00 +0530"
category: development
thumbnail: 
keywords: 개발 블로그
permalink: /blog/development/nextjs-netlify-deploy
usemathjax: true
---

`Next.js` 로 진행한 사이드 프로젝트를 `Netlify`를 이용하여 호스팅을 하려고 했는데 웹 사이트가 정상적으로 동작하지 않는 문제점이 발생하였다.

### 1 번째 시도

Route

`next.config.js` 의 설정에 rewrite() 의 설정을 주어 사이트를 배포하였다.

```tsx
module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/",
      },
      {
        source: "/quizzes",
        destination: "/quizzes",
      },
    ];
  },
        .
        .
        .
}
```

하지만 사이트는 보여지지만 다른 Page로 이동하기 위하여 버튼을 클릭하였을 때 화면 전환이 되지 않는 문제가 발생.

이 rewrite() 설정은 말 그대로 source 경로를 destinations 에 설정한 경로로 변경해주는 것이다 보니 현재 Page 전환이 이루어지지 않는 이슈와는 전혀 상관이 없다 라는 생각이 들었고, rewrite() 설정을 지우고 public 디렉토리에 `_redirects` 파일을 생성하여 루트 경로를 지정해주었다.

```text
// public > _redirects

/* /index.html 200
```

![NotFoundPage]({{site.baseurl}}/assets/img/posts/231116/netlify-not-found.png)

하지만 첫 화면 조차 보이지 않는....

### 2 번째 시도

1 번째 시도에서 실패한 이유를 찾아보던 중 `Netlify` 에서 `SSR` 또는 `SSG` 를 사용한 페이지가 있다면 SPA에서 하던 방식대로 배포를 할 경우 페이지를 불러오지 못한다 라는 글을 확인하였고,

플러그인의 도움을 받아 SSR 환경에서도 동작할 수 있도록

```bash
npm i -D @netlify/plugin-nextjs
```

https://www.npmjs.com/package/@netlify/plugin-nextjs

설치 후 루트 경로에 `netlify.toml` 파일을 생성

```bash
[build]
    base = ""
    command = "npm run build"
    publish = ".next"

[[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200

[[plugins]]
    package = "@netlify/plugin-nextjs"
```

하지만 `netlify.toml` 파일을 생성한 뒤로부터는 build 조차 되지 않는 문제가 발생…

![deploy-failed-list]({{site.baseurl}}/assets/img/posts/231116/failed-lists.png)

![deploy-failed-console]({{site.baseurl}}/assets/img/posts/231116/failed-console.png)

deploy config가 문제인 것 같아 deploy 설정을 변경해보았다.

```bash
[build]
    base = ""
    command = "next build"  # npm run build -> next bulid 로 변경
    publish = ".next"

[[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200

[[plugins]]
    package = "@netlify/plugin-nextjs"
```

설정을 변경해주어 build 는 성공하였지만 여전히 사이트는 동작하지 않음

![NotFoundPage]({{site.baseurl}}/assets/img/posts/231116/netlify-not-found.png)

좀 더 원인을 찾던 중에 알게된 건 Next.js 에서 정적 페이지를 배포하더라도 React에서 배포했던 방식처럼 단순히 deploy 설정만 해준다고 되는게 아니라고 한다.

next build는 SSR, SSG 까지 묶여 있는 파일을 내보는 것이고, (.next 디렉토리 생성), 정적 페이지를 사용하려면 export next를 통하여 정적페이지를 따로 내보내줘야한다 (default out 디렉토리 생성)고 하는데 내 경우랑은 상관없는 이야기..

```json
# package.json
{
    .
    .
    .
  "scripts": {
    "build": "next build && next export",
  }
    .
    .
}
```

https://www.oooooroblog.com/posts/4-nextjs-to-netlify

https://ui-log.github.io/docs/SEO/2022-11-28-Netlify%EC%97%90-Nextjs-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-out-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/#publish-directory-%E1%84%87%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC

다른 레퍼런스를 찾는 중에 target을 변경하는 방법이 있었다.

next.config.js 설정에서 target을 변경해주는 방법

```jsx
// next.config.js

module.exports = {
 target: 'serverless',
  // other options
}
```

https://medium.com/@finn.woelm/how-to-deploy-nextjs-on-netlify-with-server-side-rendering-9e8c06a06e77

하지만 이 방법도 아닌것 같다.

다시 netlify.toml 파일을 아래와 같이 변경하였고 사이트는 정상적으로 렌더 되는 것을 확인하였다.

```jsx
[build]
    command = "next build"
    base = "/client"
    publish = "/.next"

[[plugins]]
    package = "@netlify/plugin-nextjs"
```

아까 작성한 toml 파일과 달라진 점은 redirects 부분을 삭제 하였다.

```jsx
[[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
```

```text
💡 netlify.toml 파일을 생성한 순간부터 netlify의 build cli 는 의미가 없게 된다.
netlify.toml build 옵션을 기준으로 netlify deploy setting이 overwritten 된다.
```

하지만 여전히 Page 전환은 이루어지지 않고 있다..

network 탭을 열어 경로를 확인해보는데 build 된 디렉토리에서 파일을 잘 불러오는 것을 확인했다.

그리고 URL 또한 내가 정의한 대로 정상적으로 불러온다.

근데 status code 304로 /quizzes 가 사라진 채로 리다이렉트 되는 걸로 봐서 생성해두었던 middleware.ts가 문제인듯으로 보여진다.

```jsx
import {NextFetchEvent, NextRequest, NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function middleware(req: NextRequest, event: NextFetchEvent): Promise<Response> {
  try {
    const token = await getToken({req, secret, raw: true});
    const {pathname} = req.nextUrl
    const confirmedUrl = ['/quizzes']
    if (!confirmedUrl.includes(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = '/'
      if (token)
        return NextResponse.next();
      else
        return NextResponse.redirect(new URL(url, req.url));
    }
    return middleware(req, event);
  } catch (e) {
    return NextResponse.redirect(new URL('/404', req.url));
  }
}

// MARK: 미들웨어를 실행시켜야할 경로 추가
export const config = {
  matcher: ['/quizzes/:path*'],
}
```

미들웨어에 의하여 강제로 리다이렉트 되는 것 같다.

## 1. redirects 에러 (Page Not Found)

SPA 프로젝트를 build 했을 때 index.html 이 있던 반면,

Next.js 를 build 를 할 경우 index.html 이 없다. (export 해도 마찬가지)

또한 network URL을 확인해보면 domain/_next/data/[filename].json 와 같이 작성한 javascript 파일이 json 파일이 되어 읽혀지는 것을 알 수 있다.

```text
# Nextjs URL
localhost:3000/_next/data/quizzes.json?size=5

# React URL
localhost:3000/quizzes?size=5

```

이 부분을 보고 next build 환경에서는 흔히 생각했던 경로로 설정하면 안되는구나 라고 의심을 하게 되었고 next build 관련 글을 찾아보았다.

next의 경우 build가 되면 pages 내의 js 파일을 json 형태로 불러와 웹팩과 바벨의 도움으로 경로를 찾아간다고 한다.

(힌트를 얻었던 글이 어디 있었는지 잃어 버렸다...😶)

그렇기 때문에 redirects 경로를 index.html 로 했기 때문에 해당 경로를 못 찾아 갔던 것

## 2. netlify plugin 을 사용하는 이유

페이지 내에 SSR 또는 SSG를 사용하지 않았다면 파일을 next export를 사용하는데 문제가 되지 않지만, 한 페이지라도 사용한 부분이 있으면 netlify 에서 build가 되지 않는다.

`@netlify/plugin-nextjs` 을 사용하게 되면 SSR 또는 SSG 가 사용된 페이지가 존재하더라고 export 를 가능하게 해주는 플러그인

원인을 찾는 중에 `SSR` `SSG`  의 배포 환경은 `SPA` 때의 배포 환경과 다르다고 한다.