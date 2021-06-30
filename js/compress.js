///drag and drop n option
const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");
const getFile = (file) => {
  onFileChange(file);
};
const showLoader = () => {
  document.querySelector("#inputbox").style.display = "none";
  var loaderbox = document.createElement("div");
  loaderbox.id = "loader-box";
  var mainDiv = document.querySelector("#loaderDiv .col");
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);
  document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  document.querySelector("#loadingMessage").innerHTML =
    "Please Wait ,Loading Your file ";
};
const closeLoader = () => {};
const mimeTypes = "image/png,image/jpg,image/jpeg,image/webp";
const filemimes = [".png", ".webp", ".jpg", ".jpeg"];
gdrive.addEventListener(
  "click",
  (getFile, mimeTypes, showLoader, closeLoader) => {
    const data = loadPicker();
  }
);
const getDropBoxFile = (file) => {
  onFileChange(file);
};
const dropbox = document.getElementById("dropbox");
dropbox.addEventListener(
  "click",
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox();
  }
);
document.querySelector("#compress_strict").onchange = function () {
  if (document.querySelector("#compress_strict").checked == true) {
    document.querySelector("#compress_strictBtn").style.background = "green";
  } else {
    document.querySelector("#compress_strictBtn").style.background = "white";
  }
};
document.querySelector("#orientation").onchange = function () {
  if (document.querySelector("#orientation").checked == true) {
    document.querySelector("#orientationBtn").style.background = "green";
  } else {
    document.querySelector("#orientationBtn").style.background = "white";
  }
};

var input;
container.ondragover = function (e) {
  e.preventDefault();
};
boxContainer.ondrop = (e) => {
  e.preventDefault();
  onFileDrop(e.dataTransfer.files[0]);
};
const onFileDrop = (file) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (window.location.href.match("compress-an-image")) {
    if (
      extension == "webp" ||
      extension == "jpg" ||
      extension == "jpeg" ||
      extension == "png" ||
      extension == "gif"
    ) {
      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";

      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-a-gif")) {
    if (extension == "gif") {
      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";

      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-jpeg")) {
    if (extension == "jpeg") {
      document.querySelector(".container2").style.height = "300px";
      inputbox.style.display = "none";
      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-png")) {
    if (extension == "png") {
      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";
      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").innerHTML = "File format not supported";
    }
  }
};
const fileOnChange = () => {
  showLoader();
  inputbox.style.display = "none";
  input = file.files[0];
  compressImage();
};
const onFileChange = (file) => {
  inputbox.style.display = "none";
  input = file;
  compressImage();
};
////drag and drop ended

function compressImage() {
  ////loader end
  $("#file").remove();
  var reader = new FileReader();
  reader.onload = function () {
    document.querySelector("#img_div_one img").src = reader.result;
    document.querySelector("#img_div_two img").src = reader.result;

    var count = 0;
    var ans = setInterval(function () {
      count = count + 10;
      document.querySelector("#upper-loader").style.width = count + "%";
      if (count == 110) {
        document.querySelector("#upper-loader").style.display = "none";
        document.querySelector("#loaderDiv").style.display = "none";
        document.querySelector("#content").style.visibility = "visible";
        document.querySelector("#loader-box").style.display = "none";
        document.querySelector(".box").style.background = "#353535";
        document.querySelector(".container2").style.height = "auto";

        clearInterval(ans);
      }
    }, 1000);
    ////loader end

    document.querySelector("#info_div_one  #ans1").innerHTML = input.name;
    document.querySelector("#info_div_one  #ans2").innerHTML = input.type;
    document.querySelector("#info_div_one  #ans3").innerHTML =
      parseInt(input.size) / 1000 + "kb";
    document.querySelector("#info_div_one  #ans4").innerHTML =
      input.lastModifiedDate;
    ////compressing image
    document.querySelector("#info_div_two  #ans1b").innerHTML = input.name;
    document.querySelector("#info_div_two  #ans2b").innerHTML = input.type;
    document.querySelector("#info_div_two  #ans3b").innerHTML =
      parseInt(input.size) / 1000 + "kb";
    document.querySelector("#info_div_two  #ans4b").innerHTML =
      input.lastModifiedDate;

    var res = document.querySelectorAll("input,select");
    for (let i = 0; i < res.length; i++) {
      res[i].oninput = function () {
        var mimetype = document.querySelector("#compress_mimeType").value;
        var quality = document.querySelector("#compress_quality").value || 1;
        var strict = document.querySelector("#compress_strict") || false;
        var checkOrientation = document.querySelector("#orientation") || false;
        var maxWidth = document.querySelector("#compress_maxWidth").value;
        var maxHeight = document.querySelector("#compress_maxHeight").value;
        var minWidth = document.querySelector("#compress_minWidth").value;
        var minHeight = document.querySelector("#compress_maxHeight").value;
        var width = document.querySelector("#compress_width").value;
        var height = document.querySelector("#compress_height").value;
        var convertSize =
          document.querySelector("#compress_convertSize").value || 50000;
        console.log(strict.checked);
        new Compressor(input, {
          strict: strict.checked,
          checkOrientation: checkOrientation.checked,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          minWidth: minWidth,
          minHeight: minHeight,
          width: width,
          height: height,
          mimeType: mimetype,
          quality: parseInt(quality),
          convertSize: convertSize,
          success(result) {
            var filename, filetype;
            var name = result.name.match(/^.*\./);
            if (mimetype == "---") {
              var name = result.name.match(/^.*\./);
              filename = name + input.name.replace(/^.*\./, "");
              filetype = input.type;
            } else {
              var name = result.name.match(/^.*\./);
              filename = name + mimetype;
              filetype = "image/" + mimetype;
            }
            document.querySelector("#info_div_two  #ans1b").innerHTML =
              filename;
            document.querySelector("#info_div_two  #ans2b").innerHTML =
              filetype;
            document.querySelector("#info_div_two  #ans3b").innerHTML =
              result.size / 1000 + "kb";
            document.querySelector("#info_div_two  #ans4b").innerHTML =
              result.lastModifiedDate;

            document.querySelector("#save_btnn a").onclick = function () {
              document.querySelector(".box").style.background = "#ad81ee";
              document.querySelector("#content").style.display = "none";
              document.querySelector(".thankyouBox").innerHTML =
                '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';

              container.style.height = "300px";
              if (window.location.href.match("compress-an-image")) {
                box.style.background = "#ad81ee";
              } else if (window.location.href.match("compress-jpeg")) {
                box.style.background = "#33cccc";
              } else if (window.location.href.match("compress-png")) {
                box.style.background = "#66b3ff";
              } else if (window.location.href.match("compress-a-gif")) {
                box.style.background = "#ff9966";
              }
              ////download button

              document.getElementById("downloadButton").onclick = function () {
                var reader2 = new FileReader();
                reader2.onload = function () {
                  // var ans = .replace(/^.*\;/, "data:image/gif;");
                  var url = window.URL.createObjectURL(result);
                  var a = document.createElement("a");
                  if (mimetype == "---") {
                    a.href = reader2.result.replace(
                      /^.*\;/,
                      "data:" + input.type + ";"
                    );
                  } else {
                    a.href = reader2.result.replace(
                      /^.*\;/,
                      "data:image/" + mimetype + ";"
                    );
                  }

                  a.download = filename;
                  document.body.appendChild(a);
                  a.click();
                  if (lang === "en") {
                    window.location.href = `/download?tool=${pageTool}`;
                  } else {
                    window.location.href = `/${lang}/download?tool=${pageTool}`;
                  }
                };
                reader2.readAsDataURL(result);
              };
            };
            ///donwload button
          },
          error(err) {
            console.log(err.message);
          },
        });
      };
    }
  };
  reader.readAsDataURL(input);
}
document.querySelector("#Inputbox").onclick = function () {
  document.querySelector("#file").click();
};
const showDropDown = document.querySelector(".file-pick-dropdown");
const icon = document.querySelector(".arrow-sign");
const dropDown = document.querySelector(".file-picker-dropdown");
showDropDown.addEventListener("click", () => {
  addScripts();
  if (dropDown.style.display !== "none") {
    dropDown.style.display = "none";
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
  } else {
    dropDown.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  }
});
