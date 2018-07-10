var colorPickers = document.querySelectorAll('.colors li');

[].forEach.call(colorPickers, function (picker)
{
    picker.addEventListener('click', changeColor)
});

function changeColor()
{
  var colorValue = window.getComputedStyle(this, null).backgroundColor;
  var tintColor = colorValue.replace(')', ', .6)');
  tintColor = tintColor.replace('rgb', 'rgba');
  document.querySelector('.tint').style.backgroundColor= tintColor;
}
