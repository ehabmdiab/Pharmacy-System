function Alertt(msg, bool) {
  let alert = document.createElement("div");
  alert.className = "alert";
  alert.textContent = msg;
  alert.style.cssText = `
     position:absolute;
     top:50%;
     left:50%;
        transform:translate(-50%,-50%);
        background: rgba(0.47, 0.71, 0.71, 0.24);
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(6.3px);
         -webkit-backdrop-filter: blur(6.3px);
        border: 1px solid rgba(224, 196, 196, 0.42);
        z-index: 3;
        color:white;
        width: 400px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
    `;
  if (bool == true) {
    alert.style.color = "red";
  }
  let close = document.createElement("span");
  close.className = "close";
  close.textContent = "X";
  close.style.cssText = `
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px 20px;
        cursor: pointer;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        background: #f44336;
        border-radius: 0 0 0 5px;
    `;
  close.addEventListener("click", () => {
    alert.remove();
  });
  alert.append(close);
  document.body.appendChild(alert);
}

export default Alertt;
