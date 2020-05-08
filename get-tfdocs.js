// ###  ##
// Desc: Get somhm daterrz
var fs = require("fs");

let data = fs.readFileSync('inputs.txt', 'utf8');


// ### PREPPER ##
// Desc: Removes carraige returns and splits into lines
//data = data.split('/[\x20-\x7E]/gmi')
const prepper = (data) => {
  
  data = data.replace('\r\n', ' ')
  data = data.replace('\r', ' ')
  data = data.split('\n')
  data = data.filter(function (el) {
    return ( el != '');
  });
  return data
} 

const writeTfvars = (data) => {
    let desc,name,option;

    try{
        name = data.name
    }
    catch(error){
      name = " "
    }
    try{
        desc = data.description
    }
    catch(error){
      desc = " "
    }
    try{
        option = data.option
    }
    catch(error){
      option = " "
    }

    format = "\n# " + desc + "\n" + name + " = " + option
    fs.writeFileSync("terraform.tfvars",format, {  
      encoding: "utf8",  
      mode: 666,  
      flag: "a"  
    });     
    
          
    let varout = "variable   " + '"' + name +'"'+ "  { \n   description = "+ '"' + desc + '"\n' + 'default =  "" \n'+ '}';

    fs.writeFileSync('variables.tf', varout,{  
      encoding: "utf8",  
      mode: 666,  
      flag: "a"  
    });
  }
  
  const writeJSON = (data) => {
      fs.writeFileSync('inputs.json', JSON.stringify(data, null, '\t'), {  
        encoding: "utf8",  
        mode: 666,  
        flag: "a"  
      });
  }
  
 

const getOption = (data) => {
  try {
      data = data.match(/( \(Optional\) )/)
      //console.log(data)
      return data[0]
  } 
  catch (error){}
  try{
      data = data.match(/( \(Required.*\) )/)
      //console.log(data)
      return data[0]
  }   
  catch (error){}    
}

  const formatTfvar = (data) =>{
          //console.log(data)
          return{
              "name": data[0],
              "description": data[1],
              "option": getOption(data[1])    
          } 
  }
  
  function getFormat(data){
      data_list = []
      for (v of data){
        v = v.split('-')
        data = data.filter(function (el) {
          return ( el != '');
        });
        v = formatTfvar(v)
        console.log(v)
        writeTfvars(v)
        writeJSON(v)
      }
      //console.log(data_list)
      return data_list
  }

  // Prepper tests
data = prepper(data)
getFormat(data)
//console.log(data)
//---