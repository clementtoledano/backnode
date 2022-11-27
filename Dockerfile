FROM node:16.9.1-alpine AS development

#RUN apk upgrade

#RUN apk add git docker openssh

RUN mkdir /root/app

# Docker working directory
WORKDIR /root/app

COPY package*.json ./

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . .

RUN npm run build

EXPOSE 3000


################
## PRODUCTION ##
################
# Build another image named production
FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /root/app

COPY --from=development /root/app/ .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]