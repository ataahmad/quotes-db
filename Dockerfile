FROM mysql:8.0
ENV MYSQL_DATABASE quotes_db
ENV MYSQL_ROOT_PASSWORD rootpassword
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
