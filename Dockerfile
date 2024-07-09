FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

CMD ["npm", "install"]

# Copy the local code to the container image.
COPY . .

RUN npm run build

# Use a separate image for the runtime environment.
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

RUN npm install -g typescript

COPY ./scripts/seed.ts ./
RUN node --loader ts-node/esm seed.ts

CMD ["npm", "run", "start"]
