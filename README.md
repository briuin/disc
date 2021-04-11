# disc

## Startup

```
docker-compose up --abort-on-container-exit --remove-orphans
docker-compose exec mongo mongo --eval 'rs.initiate()'
```
