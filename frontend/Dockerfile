FROM      node:lts-alpine3.13 as builder

WORKDIR   /usr/src/app
COPY      yarn.lock .
COPY      package.json .

RUN       yarn install

COPY      . .

RUN       yarn build

###

FROM      node:lts-alpine3.13

ENV       PATH=/usr/src/app/node_modules/.bin:$PATH
WORKDIR   /usr/src/app

RUN       yarn add serve

EXPOSE    5000/tcp
CMD       ["serve", "-d", "-s", "-C", "."]

COPY      --from=builder /usr/src/app/build /usr/src/app
