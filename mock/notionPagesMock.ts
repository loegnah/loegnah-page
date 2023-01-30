import _ from 'lodash';

export function getNotionPageTitleMock(pageID: string) {
  return _.get(pageMarkdowns, [pageID, 'title'], null);
}

export function getNotionPageContentMock(pageID: string) {
  return _.get(pageMarkdowns, [pageID, 'content'], null);
}

export const pageMarkdowns: Record<string, { title: string; content: string }> = {
  c433dd0bf50743dc889bac0720997008: {
    title: 'nest.js - fly.io로 배포하기',
    content: `

## 배경

**nest.js**로 작성한 앱을 **fly.io**로 배포하려고 한다. fly.io에서 공식적으로 가이드가 따로 있는건 아니다. 그래서 **Dockerfile**을 이용해서 직접 배포하는 방식을 사용한다.

fly.io 로그인은 되어있다고 가정한다.

## Dockerfile

빌더와 운영 이미지를 따로 사용한다. 또한 패키지 매니저로는 **pnpm**을 사용했다.

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

- alpine 이미지를 썼지만, 문제 있을 경우 기본 이미지를 써도 무방할 것 같다.

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
  '90d2ac1aec28429baa5693b59c75cbc5': { title: '', content: 'test page' },
};
