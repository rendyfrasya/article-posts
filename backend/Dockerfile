# Stage 1: Build phase
FROM golang:1.26-alpine AS builder

# Set working directory di dalam container
WORKDIR /app

# Copy go.mod dan go.sum duluan untuk caching layer dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy seluruh source code
COPY . .

# Build binary dengan nama "server" dari folder cmd/
# CGO_ENABLED=0 agar binary bisa jalan mandiri di alpine tanpa dependensi C
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/

# Stage 2: Final phase (Image yang sangat ringan)
FROM alpine:latest

WORKDIR /app

# Copy binary dari stage builder
COPY --from=builder /app/server .

# Expose port yang akan dipakai Gin (default 8080)
EXPOSE 8080

# Jalankan binary
CMD ["./server"]