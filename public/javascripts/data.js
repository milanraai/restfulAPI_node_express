exports.groceryList = [ "chicken","eggs","rice","bread","meat","veg"];

exports.data = "Milan Rai";

exports.userList = [{
  "id": 1,
  "first_name": "Mechelle",
  "last_name": "Genever",
  "email": "mgenever0@nih.gov",
  "gender": "Female",
  "ip_address": "187.148.123.184"
}, {
  "id": 2,
  "first_name": "Eldin",
  "last_name": "Petrelli",
  "email": "epetrelli1@parallels.com",
  "gender": "Male",
  "ip_address": "179.115.40.115"
}, {
  "id": 3,
  "first_name": "Mathew",
  "last_name": "Roux",
  "email": "mroux2@ning.com",
  "gender": "Male",
  "ip_address": "7.63.218.13"
}, {
  "id": 4,
  "first_name": "Gerard",
  "last_name": "Fasson",
  "email": "gfasson3@dagondesign.com",
  "gender": "Male",
  "ip_address": "11.118.153.109"
}, {
  "id": 5,
  "first_name": "Morgan",
  "last_name": "Pettus",
  "email": "mpettus4@csmonitor.com",
  "gender": "Male",
  "ip_address": "147.1.50.38"
}];

exports.getUserInfo = function(arr, info){
    
    return arr.map(function(item){
        return item.info;
    })
}

exports.getAutoId = function(){
  var last_id = this.userList[this.userList.length-1].id;
   return  last_id + 1; 
}



