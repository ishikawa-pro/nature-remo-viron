FROM node:14-slim

ENV HOME=/nature-remo-dashboard
WORKDIR $HOME

COPY package* $HOME/
COPY tsconfig.json $HOME/
COPY --chown=node:node app $HOME/app
COPY --chown=node:node types $HOME/types
COPY --chown=node:node config $HOME/config
COPY --chown=node:node jobs $HOME/jobs
COPY .eslint* $HOME/

RUN chown -R node:node $HOME && \
    npm ci --progress=false && \
    npm run build && \
    ls dist

USER node

EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["start"]
