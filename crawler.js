#!/usr/bin/node

var request = require('request');
var cheerio = require('cheerio');
var URL =  require('url-parse');

let _crawlerJSONURL = null;
function CrawlerJSON (url) {
    _crawlerJSONURL = url;
}
const proto = CrawlerJSON.prototype;

proto.domain = null;

const search = proto.search = Object.create(null);
const _searchData = [];
search.add = function (name, value) {
    _searchData.push(name + '=' +value);
};

proto.load = function (cb) {
    return new Promise(function (resolve, reject) {
        let url = `${_crawlerJSONURL}?${_searchData.join('&')}`;
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};

const getCrawler = function () {
    const crawlerJSON = new CrawlerJSON('');
    crawlerJSON.search.add('', '');
    return crawlerJSON;
};

let currentRequest = 0;
const getData = async function (offset) {
    console.log('loading', offset);
    const crawlerJSON = getCrawler();
    crawlerJSON.search.add('page[offset]', offset);
    let tmpResult = await crawlerJSON.load().catch(err => {
        if (currentRequest <= 5) {

     }
    });

    currentRequest = 0;
    console.log(tmpResult)
    return tmpResult;
};


async function a() {
    const result = [];
    for (i = 0; i < 29181; i += 100) {
        let a = await getData(i)
        result.push(a);
    }
    console.log(JSON.stringify(result, null, 4));
}

a();