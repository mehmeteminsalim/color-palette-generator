
var colorPalette = document.getElementById("color-palette");
var currentElem;

function notification(message) {
  //Mesaj değerini al
  //alert text olarak ekle
  // ..message.. değer kopyalandı
  var oldElement = document.querySelector(".alert");
  //console.log(oldElement);
  if (oldElement) {
    //console.log(oldElement.parentNode);
    oldElement.parentNode.removeChild(oldElement);
    //oldElement.remove();
  }

  var alertDiv = document.createElement("div");
  alertDiv.className = "alert";
  alertDiv.innerHTML = message;
  document.body.appendChild(alertDiv);

  //function(){};
  //()=>{}

  setTimeout(() => {
    alertDiv.classList.add("active");
  }, 1);
  setTimeout(() => {
    alertDiv.classList.remove("active");
  }, 2000);


}

//notification('Color <b>aaaaa</b> copied to your clipboard');

function generateColorPalette() {
  colorPalette.innerHTML = "";
  for (let i = 0; i < 5; i++) {

    var color = generateColor();

    var li = document.createElement("li");

    var spanColor = document.createElement("span");
    spanColor.className = "color";
    spanColor.style.setProperty("--color", color);
    //spanColor.style.backgroundColor = color;
    var spanText = document.createElement("span");
    spanText.className = "text";
    spanText.innerText = color;

    var input = document.createElement("input");
    input.name = "color";
    input.value = color;

    li.appendChild(spanColor);
    li.appendChild(spanText);
    li.appendChild(input);
    colorPalette.appendChild(li);

    li.addEventListener("mouseover", (e) => {
      currentElem = e.target.parentNode;
    });

    li.addEventListener("click", (e) => {
      var targetInput = e.target.parentNode.querySelector('input[name="color"]');
      targetInput.select();
      document.execCommand('copy');
      notification('Color <b>' + targetInput.value + '</b> copied to your clipboard');
    })


  }
}




function generateColor() {
  var colorString = "abcdef0123456789";
  var diyezString = "#";

  for (let i = 0; i < 6; i++) {
    var rnd = Math.floor(Math.random() * colorString.length);
    diyezString += colorString[rnd];
  }
  return diyezString; //#f0f24f

}

window.addEventListener("keypress", (e) => {
  console.log(e.target)
  if (e.keyCode === 32) {
    generateColorPalette();
  } else if (e.keyCode === 99 && currentElem) {
    var targetInput = currentElem.querySelector('input[name="color"]');
    targetInput.select();
    document.execCommand('copy');
    notification('Color <b>' + targetInput.value  + '</b> copied to your clipboard');
  }
  e.preventDefault();
});
generateColorPalette();
//console.log(generateColorPalette());