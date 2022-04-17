import fetch from "node-fetch";
import express from "express"

const path = require('path')
const path = require('path')
const app = express()

app.use('/', async (req, res) => {
    let isbn = 9780689833984
    const lexile = await isbnParser(isbn)
    const categories = await categoryParser(isbn)
    const url = await urlParser(isbn)
    
    res.send("<h1> hello <h1>")
})

function isbnParser(isbn) {
    let url = `https://atlas-fab.lexile.com/free/books/${isbn}`;
    const options = {
      headers: {
        accept: "application/json; version=1.0"
      }
    };
    
    fetch(url, options)
    .then( res => res.json())
    .then( res => {
    
        const usefulData = res.data.work.measurements.english

        let lexile = usefulData.lexile
        console.log(`Lexile: ${lexile}, Grade: ${lexileToGrade(lexile)}`)
        return res
    })
}

function urlParser(isbn) {
  let url = `https://atlas-fab.lexile.com/free/books/${isbn}`;
  const options = {
    headers: {
      accept: "application/json; version=1.0"
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(res => {
      const url = res.data.published_work.cover_art_url
      return url
    })
} 


function categoryParser(isbn) {
  let url = `https://atlas-fab.lexile.com/free/books/${isbn}`;
  const options = {
    headers: {
      accept: "application/json; version=1.0"
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(res => {
      const categories = res.data.work.categories
      return categories
    })
} 



function lexileToGrade(lexile){
    if     (lexile <= 165)  return 0
    else if(lexile <= 425)  return 1  
    else if(lexile <= 645)  return 2
    else if(lexile <= 850)  return 3
    else if(lexile <= 950)  return 4
    else if(lexile <= 1030) return 5
    else if(lexile <= 1095) return 6
    else if(lexile <= 1155) return 7
    else if(lexile <= 1205) return 8
    else if(lexile <= 1250) return 9
    else if(lexile <= 1295) return 10
    else if(lexile <= 2000) return 11
    else if(lexile <= 2000) return 12
}