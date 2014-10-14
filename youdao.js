var request = require('request');
var cheerio = require('cheerio');
var word    = process.argv[2];
var url     = 'http://dict.youdao.com/search?q=' + word;

if(!word){
    console.log('What are you looking for?');
    return;
}

request(url, function(error, response, body){
    if(error || response.statusCode !== 200){
        console.error(error);
    }
    var $         = cheerio.load(body);
    var $phrs     = $('#phrsListTab');
    var $eg       = $('#bilingual');

    console.log(word + ' ' + $('span.phonetic', $phrs).text());
    console.log('');
    $('.trans-container>ul>li', $phrs).each(function(){
        console.log($(this).text());
    });
    $('ul>li', $eg).each(function(){
        console.log('');
        $('p', this).each(function(){
            if(!$(this).hasClass('example-via')){
                console.log($(this).text().trim());
            }
        });
    });
    console.log('');
});
