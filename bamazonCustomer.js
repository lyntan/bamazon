var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "placeholder",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      console.log(err);
    }

    var table = new Table({
      head: ["Id", "Product", "Department", "Price", "Stock"],
      colWidths: [10, 30, 10, 10, 10]
    });

    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }

    console.log(table.toString());
    shop();
  });
}

function shop() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Enter Product ID Number to add to cart"
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter quantity needed"
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT id, product_name, stock_quantity, price FROM products WHERE ?",
        { ID: answer.ID },
        function(err, results) {
          if (err) throw err;
          if (results[0].stock_quantity >= answer.quantity) {

            var stockUpdate = results[0].stock_quantity - answer.quantity;

            var total = answer.quantity * results[0].price;
            connection.query(
              `UPDATE products SET stock_quantity=${stockUpdate} WHERE id=${answer.ID}`,
              function(err) {
                if (err) throw err;
                console.log(`Your total is: ${total}`);
              }
            );
          } else {
            console.log("Cannot fulfill order due to low stock");
            shop();
          }
        }
      );
    });
}

displayProducts();
