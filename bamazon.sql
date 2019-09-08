DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

id INT(99) NOT NULL AUTO_INCREMENT, 
product_name VARCHAR(99) NOT NULL, 
department_name VARCHAR(99) NOT NULL, 
price decimal(10,2) NOT NULL,
stock_quantity INT(99) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
        
VALUES 

(1, "Somnifix Sleep Strips", "health", 18.97, 28),
(2, "Soylent Squared", "food", 30.00, 30),
(3, "Soylent Bridge", "food", 26.00, 12),
(4, "Calorie Mate Plain", "food", 8.48, 2),
(5, "Spry Dental Gum", "food", 14.20, 2),
(6, "Saltstick Capsules", "health", 21.94, 100),
(7, "Elite Caffeine Capsules", "health", 19.99, 120),
(8, "Mack Earplugs", "health", 8.99, 50),
(9, "Alaska Bear Sleep Mask", "health", 10.99, 1),
(10, "Vick's VapoInhaler", "health", 9.50, 2)


