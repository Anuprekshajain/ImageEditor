var upload = document.getElementsByTagName('input')[0],
    holder = document.getElementById('holder'),
    state = document.getElementById('status');

if (typeof window.FileReader === 'undefined') {
  state.className = 'fail';
} else {
  state.className = 'success';
  state.innerHTML = '.';
}

upload.onchange = function (e) {
  e.preventDefault();

  var file = upload.files[0],
      reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.src = event.target.result;

    // note: no onload required since we've got the dataurl
    if (img.width > 560) { // holder width
      img.width = 560;
    }
    holder.innerHTML = '';
    holder.appendChild(img);

  };
  reader.readAsDataURL(file);

  return false;


};


function editImage() {

  var gs     = $("#gs").val();      // grayscale
  var blur   = $("#blur").val();    // blur
  var br     = $("#br").val();      // brightness
  var ct     = $("#ct").val();      // contrast
  var huer   = $("#huer").val();    //hue-rotate
  var opacity      = $("#opacity").val(); //opacity
  var invert   = $("#invert").val();  //invert
  var saturate     = $("#saturate").val();//saturate
  var sepia    = $("#sepia").val();   //sepia

  var filter =  'grayscale(' + gs+
      '%) blur(' + blur +
      'px) brightness(' + br +
      '%) contrast(' + ct +
      '%) hue-rotate(' + huer +
      'deg) opacity(' + opacity +
      '%) invert(' + invert +
      '%) saturate(' + saturate +
      '%) sepia(' + sepia + '%)';

  $("#holder img").css("filter", filter);
  $("#holder img").css("-webkit-filter", filter);

}

//When sliders change image will be updated via editImage() function
$("input[type=range]").change(editImage).mousemove(editImage);

// Reset sliders back to their original values on press of 'reset'
$('#holder').on('reset', function () {
  setTimeout(function() {
    editImage();
  },0);
});

 $('#btnsave').click(function(){
    html2canvas($('#holder'),
    {
      allowTaint: true,

      onrendered: function (canvas) {
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'image.jpg';
        a.click();
      }
    });
  });
