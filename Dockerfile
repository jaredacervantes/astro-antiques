# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-slim

# Install http-server globally
RUN npm install -g http-server

# Set working directory
WORKDIR /app

# Copy the built files from builder stage
COPY --from=builder /app/dist .

# Expose port 8080
EXPOSE 8080

# Start http-server
CMD ["http-server", ".", "-p", "8080", "--cors", "-c-1"] 