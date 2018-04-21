const Client = require('node-rest-client').Client;
const client = new Client();

const random = require('./random.json');
const nameArray = random.names;
const pincodeArray = random.pincodes;
const bloodgroupArray = random.bloodgroup;
const addressArray = random.address;
let j = 1;

// let obj = {
//     headers : {'Content-Type' : 'application/json'},
//     data : {
//         name : "Arvind"
//     }
// };
//
// client.post('http://localhost:4000/Hii', obj, function(data,response){
//     // console.log(response);
//     if(response.isDone){
//
//     }
// });

let i = 0;

setInterval(function () {
    if(i < 600){
        let name = nameArray[Math.floor(Math.random() * nameArray.length)];
        let pincode = pincodeArray[Math.floor(Math.random() * pincodeArray.length)];
        let bloodgroup = bloodgroupArray[Math.floor(Math.random() * bloodgroupArray.length)];
        let address = addressArray[Math.floor(Math.random() * nameArray.length)];
        let charArray = name.split("");
        let email = charArray[Math.floor(Math.random() * charArray.length)] + "@" + charArray[Math.floor(Math.random() * charArray.length)] + ".com";
        console.log("Email = ", email);
        let password = "123456";
        let phonenumber = "9999111190";

        let obj = {
            headers : {'Content-Type' : 'application/json'},
            data : {
                name : name,
                phone_number : phonenumber,
                blood_group : bloodgroup,
                address : address,
                pin_code : pincode,
                email : email,
                password : password
            }
        };
        client.post('http://localhost:4000/add/checkUser', {
            headers : {'Content-Type' : 'application/json'},
            data : {
                email : email
            }
        }, function (data) {
            if(!data.present){
                client.post('http://localhost:4000/add/newUser', obj, function(data,response){
                    // console.log(response);
                    if(data.isDone){
                        console.log(j++);
                    }
                });
            }
        });
        i++;
    }
}, 1000);
