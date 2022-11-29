let salesSum;
let items = document.getElementById("items");
let invoices = document.getElementById("invoices");
let outOfStock = document.getElementById("out");
let salesnum = document.getElementById("salesnum");
let buynum = document.getElementById("buynum");
let sales = document.getElementById("sales");

let db = openDatabase(
  "pharmacy",
  "1.1",
  "pharmacy system v1",
  24 * 1024 * 1024
);

const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

db.transaction(function (tx) {
  tx.executeSql(
    "Create table if not exists invoices(id int primary key,date varchar,CustomerName varchar(500),type varchar,item varchar(500),quantity int)",
    null,
    function (tx, result) {},
    function (tx, error) {
      console.log(error);
    }
  );

  tx.executeSql(
    "create table if not exists items (id int primary key ,name varchar(200), price int ,quantity int ,image varchar)",
    null,
    function (tx, result) {},
    function (tx, error) {
      console.log(error);
    }
  );

  //sum of  quantity * (price from table items) foreach sell transaction in table invoices
  tx.executeSql(
    "SELECT SUM(invoices.quantity*price)as sum  FROM invoices INNER JOIN items ON invoices.item = items.name WHERE type = '2'",
    [],
    function (tx, result) {
      console.log(result.rows[0]);
      salesSum = result.rows[0].sum || 0;
      console.log(salesSum);
      sales.innerText = formatCash(salesSum);
    },
    function (tx, error) {
      console.log(error);
    }
  );

  //number of items
  tx.executeSql(
    "select * from items",
    null,
    function (tx, result) {
      items.innerText = formatCash(result.rows.length);
    },
    function (tx, error) {
      console.log(error);
    }
  );

  //number of invoices
  tx.executeSql("select * from invoices", null, function (tx, result) {
    invoices.innerText = formatCash(result.rows.length);
  });

  //number of out of stock items
  tx.executeSql(
    "select * from items where quantity ='0'",
    null,
    function (tx, result) {
      outOfStock.innerText = formatCash(result.rows.length);
    }
  );

  //number of sales
  tx.executeSql(
    "select * from invoices where type ='2'",
    null,
    function (tx, result) {
      salesnum.innerText = formatCash(result.rows.length);
    },
    function (tx, error) {
      console.log(error);
    }
  );

  //number of buy
  tx.executeSql(
    "select * from invoices where type = '1'",
    null,
    function (tx, result) {
      buynum.innerText = formatCash(result.rows.length);
    },
    function (tx, error) {
      console.log(error);
    }
  );
});
