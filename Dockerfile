FROM golang:1.24
WORKDIR /app

COPY . .
RUN go build
EXPOSE 8090

CMD ["./lenz-web"]

