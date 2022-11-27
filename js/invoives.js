let db = openDatabase(
  "pharmacy",
  "1.1",
  "pharmacy system v1",
  24 * 1024 * 1024
);

let tbody = document.getElementById("tbody");

function showInvoices() {
  db.transaction(function (tx) {
    tx.executeSql(
      "select * from invoices ",
      null,
      function (tx, result) {
        let htmlCode = "";
        for (let i = 0; i < result.rows.length; i++) {
          let currentRecord = result.rows[i];

          htmlCode += `
              <tr>
              <td>
              ${currentRecord.date}
              </td>
              <td>
              ${currentRecord.CustomerName}
              
              </td>
              <td>
              ${currentRecord.type == 1 ? "Buy" : "sell"}
              </td>
              <td>
              ${currentRecord.item}
              </td>
              <td>
              ${currentRecord.quantity}
              </td>
              <td>
              <button class="btn" onclick="deleteItem(${
                currentRecord.id
              })">Delete</button>
              </td>
              
                      </tr>
                      `;
        }
        tbody.innerHTML = htmlCode;
      },
      function (tx, err) {
        console.log(err);
      }
    );
  });
}

showInvoices();

function deleteItem(id) {
  db.transaction(function (tx) {
    tx.executeSql(
      "delete from invoices where id=?",
      [id],
      function (tx, result) {
        showInvoices();
      },
      function (tx, err) {
        console.log(err);
      }
    );
  });
}
