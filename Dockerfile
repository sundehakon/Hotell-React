FROM 20.11.1
WORKDIR /src
COPY . /src/
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]