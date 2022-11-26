let db = openDatabase(
  "pharmacy",
  "1.1",
  "pharmacy system v1",
  24 * 1024 * 1024
);

let tbody = document.getElementById("tbody");

function showItems() {
  db.transaction(function (tx) {
    tx.executeSql(
      "select * from items ",
      null,
      function (tx, result) {
        let htmlCode = "";
        for (let i = 0; i < result.rows.length; i++) {
          let currentRecord = result.rows[i];

          htmlCode += `
            <tr>
            <td>
            <img src="${currentRecord.image}" style='width:4rem; height:4rem;'></img>
            </td>
            <td>
            ${currentRecord.name}
            
            </td>
            <td>
            ${currentRecord.quantity}
            </td>
            <td>
            ${currentRecord.price}
            </td>
            <td>
            <button class="btn" onclick="deleteItem(${currentRecord.id})">Delete</button>
            </td>
            
                    </tr>
                    `;
        }
        tbody.innerHTML = htmlCode;
      },
      function (tx, err) {
        console.log(err);
        alert(err.message);
      }
    );
  });
}

showItems();

function deleteItem(id) {
  db.transaction(function (tx) {
    tx.executeSql(
      "delete from items where id=?",
      [id],
      function (tx, result) {
        showItems();
      },
      function (tx, err) {
        console.log(err);
      }
    );
  });
}
