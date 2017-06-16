$('document').ready(function(){
  console.log('document is ready.')
  //$('.new-tweet .textSpace').closest('form').find('.counter').text('0');
  $('.new-tweet .textSpace').on("keyup", function(){
    var textCount = $(this).val().length;

    // get the text count in html
    var text = $(this).closest('form').find('.counter').text(140 - textCount);

    if(textCount <= 140){
      text.css({'color': 'black'});
    }
    if(textCount > 140){
    text.css({'color':'red'});
    }
  });
});

