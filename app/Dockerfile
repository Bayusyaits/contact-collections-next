FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json .
COPY yarn.lock .
RUN yarn install

COPY . .
COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh
#RUN sed -i -e 's/\r$//' entrypoint.sh
ENV ENV_REACT_APP_API_URL $ENV_REACT_APP_API_URL
ENV REACT_USER_UUID $REACT_USER_UUID

ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 3003
CMD [ "yarn", "dev"]
