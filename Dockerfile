FROM golang:1.24
WORKDIR /app

COPY . .
RUN go build
EXPOSE 8085

CMD ["./lenz-web"]

