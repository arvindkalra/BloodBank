#ROUTES

**POST `/add/new`** <br>
For Adding New Contact to the database.<br>
* Body Parameters {name, phone_number, address, blood_group, pin_code, email}<br>
* Object in DB {name, phone_number, address, blood_group, email, last_donated(null)}<br>
* Response {name, isDone(boolean)}<br>