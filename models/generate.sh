#!/usr/bin/env bash
sequelize-auto -o "./ecommerce_db"  -d ecommerce_db -h localhost -u harika -p 5432 -x $DB_PASSWORD -e postgres -t Carts
# to run DB_PASSWORD=password sh ./generate.sh
