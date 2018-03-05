#ROUTES

**POST `/add/newUser`** (Checked OK)<br>
For Adding New Contact to the database.<br>
* Body Parameters {name, phone_number, address, blood_group, pin_code, email, password}
* Object in DB {name, phone_number, address, blood_group, email, last_donated(null)}
* Response {name, isDone(boolean), hash}

**POST `/get/request`** (yet to make)<br>
For Requesting for Blood. <br>
* Body Parameters {name, phone_number, pin_code, address}
* Object in DB (Iterate over DB to get List)
* Response {list(array[name, phone_number])}

**POST `/add/checkUser`** (Checked OK)<br>
For Checking if User Exists <br>
* Body Parameters {email}
* Object in DB (Iterate over DB to get List)
* Response {present(boolean)}

**POST `/login`** (Checked OK Render Page to Be Added)<br>
For Providing Sign In Functionality <br>
* Body Parameters {username, password}
* Object in DB (Iterate over DB to get List)
* (If Incorrect)Response {isDone : false}  (If Correct)Response {isDone : true, hash(Crypto)}