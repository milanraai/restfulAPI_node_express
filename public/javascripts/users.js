module.addNew = function(arr){
    
    person = new Person(6,"Milan", "Rai", "raim@gmail.com", "m");
    
    arr.push(person);
}

module.data = "Milan Rai";

function Person(id,firstName,lastName,email,gender,ip_address){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.ip = ip_address;
}