$(document).ready(function() {

  let lang = 'en';

  $('#language-container li').on('click', function(){
    let langType = this.innerHTML;
    lang = langType.toLowerCase();
    return lang;
  });

  function myAnswers() {
    $('#resulter').empty();
    // $('.answer').remove();

    // $('#language-container li').on('click', function(){
    //   let langType = this.innerHTML;
    //   lang = langType.toLowerCase();
    //   // console.log(final);
    //   return lang;
    // });

    let term = document.getElementById('search-value').value;
    const getUrl = 'https://' + lang + '.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + term + '&utf8=&format=json&callback=?';

    $.ajax({
      url: getUrl,
      dataType: 'json',
      success: function(result) {
        // console.log(result);
        // console.log(result.query.search);
        // console.log(result.query.search[3]);

        for(let i = 0; i < 5; i++) {

          // style='display: none'

          let answer = "<div class='answer'><h3>";
          answer += result.query.search[i].title + "</h3>";
          answer += "<p>" + result.query.search[i].snippet + "...</p>";
          answer += "<a href='https://" + lang + ".wikipedia.org/wiki/" + result.query.search[i].title + "' target='_blank'>See more +</a>";
          answer += "</div>";

          $('#resulter').append(answer);
        }
      }
    });
  };

  $('#search-button').on('click', function(){

    myAnswers();
  });

  $('#search-value').keypress(function (e) {
   var key = e.which;
   if(key == 13)
    {
      myAnswers();
    }
  });

});
