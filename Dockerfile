# --- Base Stage: Build the app ---
FROM node:slim AS base

WORKDIR /app

# Install dependencies (use cache when possible)
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source and build
COPY . .

# Build the SvelteKit app
RUN npm run build


# --- Production Stage: Create minimal image for runtime ---
FROM cgr.dev/chainguard/node AS prod

WORKDIR /app

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Only copy what’s needed to run the app
COPY --from=base /app/package.json ./
COPY --from=base /app/build ./build

# Set environment
ENV NODE_ENV=production

# Expose the default port
EXPOSE 3000

# Start the SvelteKit server (adapter-node builds to `build`)
CMD ["build"]
