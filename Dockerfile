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
RUN npm ci --omit=dev

# --- Production Stage: Create minimal image for runtime ---
FROM gcr.io/distroless/nodejs22-debian12 AS prod

WORKDIR /app

# Only install production dependencies
COPY package.json package-lock.json ./

# Only copy what’s needed to run the app
COPY --from=base /app/package.json ./
COPY --from=base /app/build ./build
COPY --from=base /app/.svelte-kit ./.svelte-kit

# Set environment
ENV NODE_ENV=production

# Expose the default port
EXPOSE 3000

# Start the SvelteKit server (adapter-node builds to `build`)
CMD ["node", "build"]
