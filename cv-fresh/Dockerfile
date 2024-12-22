FROM denoland/deno:alpine-2.1.4

WORKDIR /app

COPY . .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]