FROM mongo
COPY init.json /init.json
CMD mongoimport  --uri mongodb://db:27017/test --collection blogs --type json --file /init.json --jsonArray