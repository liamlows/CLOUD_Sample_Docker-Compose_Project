// For Dynamic Routes
const express = require('express');
const router = express.Router();
const pool = require('./db');

// Processing the JSON object
var joinKeys = function(object, type) {
    // result of the joined keys
    var result = ["", ""];
  
    // returns the array of keys and array of values given a json object
    var [k, v] = getKeyValues(object);
  
    // loop through and push the key value pairs to the string with correct formatting
    for (var i = 0; i < k.length; i++) {
      if (k[i] == 'token') {
        continue;
      }
      if (type == 'get') {
        result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
        if (i < k.length-1)
          result[0] = result[0].concat(' AND ');
      }
      else if (type == 'post') {
        result[0] = result[0].concat(k[i])
        result[1] = result[1].concat(v[i])
        if (i < k.length-1) {
          result[0] = result[0].concat(',');
          result[1] = result[1].concat(',');
        }
      }
      else if (type == 'put') {
        result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
        if (i < k.length-1)
          result[0] = result[0].concat(',');
      }
      else if (type == 'delete') {
        result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
        if (i < k.length-1)
          result[0] = result[0].concat(' AND ');
      }
    }
    return result;
}
  
var getKeyValues = function(object) {
// get the json key-value pairs and assign it to a variable
const keys = Object.keys(object);

// initialization of the key and value lists
var keyList = [];
var valueList = [];

// push all of the keys and values to their lists with correct formatting
for (let i = 0; i < keys.length; i++) {
    keyList[i] = keys[i];
    valueList[i] = '\''.concat(object[keys[i]]).concat('\'');
}
return [keyList, valueList];
}

exports.get = async function(req, res) {
    // get the params from the link
    var table = req.params.table;
    var variable = req.params.variable;
    var value = req.params.value;
  
    // get the key-value pairs from the body
    var result = joinKeys(req.body, 'get');
  
    // set the initial query
    var query = 'SELECT * FROM '.concat(table);
  
    // explicit table, explicit variable, and explicit value
    if (value != null)
      query = query.concat(' WHERE ').concat(variable).concat(' = \'').concat(value).concat('\'');
  
    // explicit table, implicit default variable, and explicit value
    else if (variable != null)
      query = query.concat(' WHERE ').concat(key[table][0]).concat(' = \'').concat(variable).concat('\'');
  
    // explicit table, variable and value gotten from body
    else if (table != null)
      if (result[0].length > 0) { query = query.concat(' WHERE ').concat(result[0]); }
  
    // send the query
    let rows, fields;
    [rows, fields] = await pool.execute(query);
    res.json(result).send();

  };