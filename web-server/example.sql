/* Insert these to create a new database and user in your PosgreSQL: */
CREATE USER find_restaurant_user WITH PASSWORD '123456' SUPERUSER;
CREATE DATABASE find_restaurant_db;

/* Login to your database "foodie" with password "123456": */
psql -U find_restaurant_user -W -h localhost find_restaurant_db;