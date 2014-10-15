#! /usr/bin/env node

var request = require('request');
var cheerio = require('cheerio');
var chalk   = require('chalk');
var word    = process.argv[2];
var url     = 'http://dict.youdao.com/search?q=' + word;

if(!word){
    return;
}

request(url, function(error, response, body){
    if(error || response.statusCode !== 200){
        console.log(chalk.bold.red(error));
    }
    var $         = cheerio.load(body);
    var $phrs     = $('#phrsListTab');
    var $eg       = $('#bilingual');

    console.log(chalk.bold.blue(word + ' ' + $('span.phonetic', $phrs).text()));
    console.log('');
    $('.trans-container>ul>li', $phrs).each(function(){
        console.log(chalk.green($(this).text()));
    });
    $('ul>li', $eg).each(function(){
        console.log('');
        $('p', this).each(function(){
            if(!$(this).hasClass('example-via')){
                console.log(chalk.yellow($(this).text().trim()));
            }
        });
    });
    console.log('');
});
