FROM node:20.9-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Instalar TODAS as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copiar código fonte E arquivos swagger
COPY src ./src

# Gerar Prisma Client e compilar TypeScript
RUN npx prisma generate
RUN npm run build

# Copiar arquivos swagger manualmente para o dist
RUN mkdir -p dist/swagger/schemas
RUN cp src/swagger/schemas/json-schema.json dist/swagger/schemas/
RUN cp src/swagger/swagger.yaml dist/swagger/

# Stage 2: Production
FROM node:20.9-alpine

WORKDIR /app

# Copiar package.json e prisma
COPY package*.json ./
COPY prisma ./prisma

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar arquivos compilados do stage builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3001

# Rodar migrations e iniciar aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]