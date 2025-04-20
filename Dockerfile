# Build stage
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the site
RUN pnpm build

# Expose the preview port
EXPOSE 4321

# Start the preview server
CMD ["pnpm", "preview", "--host"] 