# add the Node.js docker image
FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json file
COPY package*.json ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN apk add --update --no-cache openssl1.1-compat

# Install package.json dependencies
RUN npm install

# Generate prisma client
RUN npx prisma generate

# Run and expose the server on port 3333
EXPOSE 3333

ARG POSTGRES_URL
ENV POSTGRES_URL "$POSTGRES_URL"

RUN npm install

CMD ["npm", "run", "dev"]