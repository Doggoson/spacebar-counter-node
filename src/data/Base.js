var Base = require('./Object');
var BaseArray = Object.entries(Base);
var Json = JSON.stringify(Base).split("{").join("{\n").split(":").join(": ").split(",").join(",\n").split("}").join("}");
const fs = require('fs');

module.exports = {
  set:async (id, key, value) => {

        if(!id) return console.log(`No id specified.`);
        if(!key) return console.log(`No key specified.`);
        if(!value) return console.log(`No key value specified. (${key})`);
    
        if(!Base[id]) return;
        Base[id][key] = value
        await Base[id][key];

        fs.writeFileSync(__dirname + '/Object.json', Json);
    },
  fetch:(id, key) => {
    if(!Base[id]) return null;
    if(!Base[id][key]) return null;
    
    return Base[id][key];
    },
  add:(id, key, value) => {
        if(!id) return console.log(`No id specified.`);
        if(!key) return console.log(`No key specified.`);
        if(!value) return console.log(`No key value specified. (${key})`);
        if(!Base[id]) return console.log(`Invalid id.`);
        if(!Base[id][key]) return console.log(`Invalid key. (${key})`);

        Base[id][key] = Base[id][key] + value
    },
  all:() => {
    return BaseArray;
  },
  users: {
    create:async (username, password) => {
      
      if(!username || !password) throw new Error("No username or password");
      
      for(var i = 0; i < BaseArray.length; i++) {
        console.log(`User ${i + 1}: ${BaseArray[i][1].Username}`);
        if(BaseArray[i][1].Username === username) return;
      }
      
      var ID = Math.floor(Math.random() * 9999999999)+ 1111111111;
      
      //Give new ID + Save User\\
      while(BaseArray[ID]) {
        ID = Math.floor(Math.random() * 9999999999)+ 1111111111;
        
        if(!BaseArray[ID]) {
          break;
        }
      }
      
      Base[ID] = { Username: username, Password: password, Data: {} }
      fs.writeFileSync(`${__dirname}/Object.json`, Json); 
  },
  findByUsername:(username) => {
    for(var i = 0;i < BaseArray.length;i++) {
      if(BaseArray[i][1].Username === username) {
        return BaseArray[i][0];
      }
   }
  }
 }
};
