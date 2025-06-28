FROM denoland/deno:alpine-2.3.7

WORKDIR /app

COPY . .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]