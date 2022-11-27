// injecting data to datalist start
let datalist = document.getElementById("item");
let html;

let db = openDatabase(
  "pharmacy",
  "1.1",
  "pharmacy system v1",
  24 * 1024 * 1024
);

db.transaction(function (tx) {
  tx.executeSql(
    "SELECT * FROM items",
    [],
    function (tx, result) {
      for (let i = 0; i < result.rows.length; i++) {
        html += `<option value="${result.rows[i].name}">`;
      }
      datalist.innerHTML = html;
    },
    function (tx, error) {
      console.log(error);
    }
  );
});

// injecting data to datalist end
// start validation
let customerName = document.getElementById("customer");
let transaction = document.getElementById("select");
let quantity = document.getElementById("quantity");
let date = document.getElementById("date");
let datalistInput = document.querySelector('[list="item"]');
let add = document.getElementById("Add");

let validateMsg = (input, message) => {
  let msg = document.createElement("p");
  msg.style.cssText = `
      color:red;
      font-size:11px;
      margin:2px auto 10px;
      margin-top:-15px;
      z-index:2;
        `;
  msg.className = "msg";

  let query = document.querySelector(".msg");
  if (query == null) {
    switch (input) {
      case "customerName":
        msg.textContent = message;
        customerName.after(msg);
        break;

      case "transaction":
        msg.textContent = message;
        transaction.after(msg);
        break;
      case "itemName":
        msg.textContent = message;
        datalist.after(msg);
        break;
      case "quantity":
        msg.textContent = message;
        quantity.after(msg);
        break;
      case "date":
        msg.textContent = message;
        date.after(msg);
        break;
    }
  }
};

function validate() {
  let validated = true;
  if (customerName.value == "") {
    validateMsg("customerName", "Please enter customer name");
    validated = false;
  }
  if (transaction.value == 0) {
    validateMsg("transaction", "Please choose the transaction type");
    validated = false;
  }

  if (datalist.value == "") {
    validateMsg("itemName", "Please choose item name");
    validated = false;
  }

  if (quantity.value == "") {
    validateMsg("quantity", "Please enter the quantity");
    validated = false;
  }

  if (date.value == "") {
    validateMsg("date", "Please enter the date");
    validated = false;
  }

  return validated;
}

// end validation

// start database and crud
import Alertt from "./alert.js";

function addInvoice() {
  let id = Date.now();
  let customerName = document.getElementById("customer").value;
  let transaction = document.getElementById("select").value;
  let quantity = document.getElementById("quantity").value;
  let date = document.getElementById("date").value;
  let datalistInput = document.querySelector('[list="item"]').value;

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
      "insert into invoices(id,date,CustomerName,type,item,quantity) values(?,?,?,?,?,?)",
      [id, date, customerName, transaction, datalistInput, quantity],
      function (tx, result) {
        Alertt(" ✅ Invoice Added Successfully");
      },
      function (tx, error) {
        console.log(error);
      }
    );
  });
}

add.addEventListener("click", (e) => {
  if (validate()) {
    addInvoice();

    customerName.value = quantity.value = date.value = "";
    transaction.value = 0;
    datalistInput.value = "";
  }
});

// end database and crud
