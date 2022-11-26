let video = document.querySelector("#videoElement");
let canvas = document.querySelector("#showscreenshot");

async function startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  }
}

function stopCamera(e) {
  let stream = video.srcObject;
  let tracks = stream.getTracks();
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    track.stop();
  }
  video.srcObject = null;
}

function takeScreenshot() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
}

// validation
let Name = document.querySelector(".name");
let price = document.querySelector(".price");
let quantity = document.querySelector(".Quantity");
let Add = document.getElementById("Add");

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
      case "name":
        msg.textContent = message;
        Name.after(msg);
        break;

      case "price":
        msg.textContent = message;
        price.after(msg);
        break;
      default:
        msg.textContent = message;
        quantity.after(msg);
    }
  }
};

function validate() {
  let validated = true;
  if (Name.value == "") {
    validateMsg("name", "Please enter the name of the item");
    validated = false;
  }
  if (price.value == "") {
    validateMsg("price", "Please enter the price of the item");
    validated = false;
  }
  if (quantity.value == "") {
    validateMsg("quantity", "Please enter the quantity of the item");
    validated = false;
  }

  return validated;
}

// validation

let stop = document.getElementById("stop");
let start = document.getElementById("start");
let take = document.getElementById("take");

start.addEventListener("click", startCamera);
stop.addEventListener("click", stopCamera);
take.addEventListener("click", takeScreenshot);

import Alertt from "./alert.js";

//database openning and crud start
let db = openDatabase(
  "pharmacy",
  "1.1",
  "pharmacy system v1",
  24 * 1024 * 1024
);

console.log(db);

function AddItem() {
  let Name = document.querySelector(".name").value;
  let price = document.querySelector(".price").value;
  let quantity = document.querySelector(".Quantity").value;
  let image = canvas.toDataURL();
  let id = Date.now();

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists items (id int primary key ,name varchar(200), price int ,quantity int ,image varchar)",
      null,
      function (tx, result) {},
      function (tx, error) {
        console.log(error);
      }
    );

    tx.executeSql(
      "insert into items (id,name,price,quantity,image) values (?,?,?,?,?)",
      [id, Name, price, quantity, image],
      function (tx, result) {
        Alertt(" ✅ Item Added Successfully");
      },
      function (tx, error) {
        console.log(error);
      }
    );
  });
}

//database openning and crud end

Add.addEventListener("click", (e) => {
  if (validate()) {
    AddItem();
    price.value = Name.value = quantity.value = "";
  }
});
