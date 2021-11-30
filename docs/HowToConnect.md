# Overview
Database is run on AWS RDS service. Therefore, we need to use client app to connect to database.
```
Host: comp3380-destinity-db.caeqnwemzynt.ca-central-1.rds.amazonaws.com
Port: 5432
Database: destinity

User: postgres
Password: COMP3380Fall2021
```
# Connect by pgAdmid4

## Install
https://www.pgadmin.org/download/
Follow the process in the website. Let me know if you have any difficults.
## Connect
1. Open pgAdmin4
2. Click Connect to new server. You should see this on open screen.
3. Fill up Server name. ANy name you want.
4. Go to `Connection` tab.
5. Fill all fields with information given in Overview section.

# Connect by psql - command line
For Linux (Ubuntu)
## Install
```
$ sudo apt-get install -y postgresql-client
```
## Connect
Run this command
```
psql --host=comp3380-destinity-db.caeqnwemzynt.ca-central-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=destinity
```

# References
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToPostgreSQLInstance.html
