import _ from 'lodash';

export function getNotionPageTitleMock(pageID: string) {
  return _.get(pageMarkdownsMock, [pageID, 'title'], null);
}

export function getNotionPageContentMock(pageID: string) {
  return _.get(pageMarkdownsMock, [pageID, 'content'], null);
}

export function getPageInfosMock() {
  return pageInfosMock;
}

const pageInfosMock = [
  {
    postNum: 1,
    tags: ['Nest.js', 'fly.io', 'Docker'],
    pageID: 'c433dd0b-f507-43dc-889b-ac0720997008',
    title: 'nest.js - fly.io로 배포하기',
  },
  {
    postNum: 2,
    tags: ['React', 'Next.js', 'Notion'],
    pageID: '27336451-ea87-418d-8377-806a30993c6d',
    title: 'notion 페이지를 HTML로 출력하기',
  },
];

const pageMarkdownsMock: Record<string, { title: string; content: string }> = {
  'c433dd0b-f507-43dc-889b-ac0720997008': {
    title: 'nest.js - fly.io로 배포하기',
    content: `

## 배경


**nest.js**로 작성한 앱을 [**fly.io**](http://fly.io/)에 배포하려고 합니다. fly.io에서는 공식적으로 가이드를 제공하지 않습니다. 따라서 **Dockerfile**을 사용하여 직접 배포하는 방식을 사용합니다.


[fly.io](http://fly.io/) 로그인을 이미 완료했다고 가정합니다.


## Dockerfile


빌더와 운영 이미지를 따로 사용합니다. 또한 패키지 매니저로는 **pnpm**을 사용했습니다.


\`\`\`docker
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && \\
    pnpm install && \\
    pnpm build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
RUN npm install -g pnpm
EXPOSE 3000
ENTRYPOINT ["pnpm","start:prod"]
\`\`\`

- alpine 이미지를 사용했지만, 문제가 발생할 경우 기본 이미지를 사용해도 무방합니다.

## fly.toml 파일 작성


내부적으론 **3000**번 포트를 쓰고 외부로 공개되는 포트는 **http/https 기본 포트(80,443)** 으로 사용했다.


\`\`\`toml
app = "APP_NAME"
kill_signal = "SIGINT"
kill_timeout = 5

[[services]]
  http_checks = []
  internal_port = 3000
  processes = ["app"]
  protocol = "tcp"
  script_checks = []
  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 6
    timeout = "2s"
\`\`\`

- flyio에서 기본적으로 지정해주는 세팅들이 포함되어있다. (limit, tcp checks 등)

## 배포


우선 flyio에 앱을 만든다.


\`\`\`shell
fly launch
\`\`\`

- 만들어놓은 fly.toml을 사용
- 지역은 도쿄(일본), 데이터베이스는 따로 만들지 않음

이후 flyio의 [dashboard](https://fly.io/dashboard)로 가면 배포된 앱을 확인할 수 있다.


이후 배포할 땐 앱을 새로 만들 필요는 없어서 fly deploy를 사용한다.


\`\`\`shell
fly deploy
\`\`\`


`,
  },
  '27336451-ea87-418d-8377-806a30993c6d': {
    title: 'notion 페이지를 HTML로 출력하기',
    content: `

## 본문을 마크다운으로 가져오기


[notion-to-md ](https://www.npmjs.com/package/notion-to-md)npm 모듈을 사용해서 Notion 페이지를 마크다운으로 변경할 수 있다.  \`notion-to-md\` 모듈과 \`@notionhq/client\` 모듈이 필요하다 필요하다. 변환한 마크다운은 \`toMarkdownString\` 함수로 문자열로 변환할 수 있다.


\`\`\`javascript
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

const notion = new Client({ auth: NOTION_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });
const pageId = PAGE_ID;

(async () => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  console.log(mdString);
})();
\`\`\`


### 마크다운을 HTML로 변환


[react-markdown](https://www.npmjs.com/package/react-markdown) npm 모듈을 사용해서 간단하게 변환할 수 있다.


\`\`\`typescript
import ReactMarkdown from 'react-markdown';


export default function NotionMD({ markdown }) {
  return (
    <ReactMarkdown>
      {markdown}
    </ReactMarkdown>
  );
}
\`\`\`


## notion 페이지에서 제목 가져오기


제목은 Notion-to-MD에서 제공하지 않으므로, 다른 방법으로 가져와야 한다. [@notionhq/client ](https://www.npmjs.com/package/@notionhq/client)를 사용해서 가져온다. (참고로, @notionhq/c 잘못되어 있으므로, any로 변환해서 사용한다.)


\`\`\`typescript
async function getPageTitle(pageID: string) {
  if (isDev()) {
    const title = getNotionPageTitleMock(pageID);
    if (title) return title;
  }
  const { properties } = (await notion.pages.retrieve({ page_id: pageID })) as any;
  return properties[properties['title'] ? 'title' : '이름'].title[0].plain_text;
}
\`\`\`

- \`‘title’, ‘이름’\` 을 확인하는 이유 : notion 사용자의 언어설정에 따라 다르게 설정되어 확인 후 사용한다.

## 이슈


### nextjs에서 사용할 때 encoding 모듈이 없다는 경고 출력

- 정확한 원인은 파악못함. @notionhq/client와 관련이 있다는 것만 한다.
- encoding 모듈을 추가하여 해결 (\`pnpm add encoding\`)

### 


`,
  },
};
