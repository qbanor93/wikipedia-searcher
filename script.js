$(document).ready(function() {

  // Language Changer

  let lang = 'en';

  // console.log(lang);

  $('#random-btn').attr('href', 'https://' + lang + '.wikipedia.org/wiki/Special:Random');

  function myRandom() {
    var baseRandom = 'https://' + lang + '.wikipedia.org/wiki/Special:Random';
    // console.log(baseRandom);
    $('#random-btn').attr('href', baseRandom);
  }

  $('#language-container li').on('click', function(){
    let langType = this.innerHTML;
    lang = langType.toLowerCase();

    // console.log(lang);

    myRandom();

    return lang;
  });

  // Main Function

  // console.log(lang);

  // var baseRandom = 'https://' + lang + '.wikipedia.org/wiki/Special:Random';
  // console.log(baseRandom);
  // $('#random-btn').attr('href', 'https://' + lang + '.wikipedia.org/wiki/Special:Random');

  function myAnswers() {
    $('#resulter').empty();

    let randomSearch = 'https://' + lang + '.wikipedia.org/wiki/Special:Random';
    $('#random-btn').attr('href', randomSearch);

    // Create url for AJAX Call

    let term = document.getElementById('search-value').value;
    const getUrl = 'https://' + lang + '.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + term + '&utf8=&format=json&callback=?';

    // AJAX Call

    $.ajax({
      url: getUrl,
      dataType: 'json',
      success: function(result) {
        // console.log(result.query.search[3]);

        for(let i = 0; i < 5; i++) {

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

  // Activate Search with a click

  $('#search-button').on('click', function(){
    myAnswers();
  });

  // Activate Search with an enter keypress

  $('#search-value').keypress(function (e) {
   var key = e.which;
   if(key == 13)
    {
      myAnswers();
    }
  });

});
