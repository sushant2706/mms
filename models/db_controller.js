var mysql = require("mysql");
var express = require("express");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fyp",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("You are connected");
  }
});

module.exports.signup = function (username, email, password, status, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};

module.exports.getuserid = function (email, callback) {
  var query = "select *from verify where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.add_doctor = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    email +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    department +
    "','" +
    biography +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllDoc = function (callback) {
  var query = "select * from doctor";
  con.query(query, callback);
};

module.exports.getDocbyId = function (id, callback) {
  var query = "select * from doctor where id =" + id;
  con.query(query, callback);
};

module.exports.getEmpbyId = function (id, callback) {
  var query = "select * from employee where id =" + id;
  con.query(query, callback);
};

module.exports.editDoc = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "update `doctor` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "',`image`='" +
    image +
    "',`department`='" +
    department +
    "',`biography`='" +
    biography +
    "' where id=" +
    id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.editEmp = function (
  id,
  name,
  email,
  contact,
  join_date,
  role,
  callback
) {
  var query =
    "update `employee` set `name`='" +
    name +
    "', `email`='" +
    email +
    "', `contact`='" +
    contact +
    "', `join_date`='" +
    join_date +
    "', `role`='" +
    role +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.deleteDoc = function (id, callback) {
  //console.log("i m here");
  var query = "delete from doctor where id=" + id;
  con.query(query, callback);
};

module.exports.deleteEmp = function (id, callback) {
  //console.log("i m here");
  var query = "delete from employee where id=" + id;
  con.query(query, callback);
};


module.exports.searchDoc = function (key, callback) {
  var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};


module.exports.searchEmp = function (key, callback) {
  var query = 'SELECT  *from employee where name  like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.findOne = function (email, callback) {
  var query = "select *from users where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};





module.exports.setpassword = function (id, newpassword, callback) {
  var query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.add_employee = function (
  name,
  email,
  contact,
  join_date,
  role,
  salary,
  callback
) {
  var query =
    "Insert into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) values ('" +
    name +
    "','" +
    email +
    "','" +
    contact +
    "','" +
    join_date +
    "','" +
    role +
    "','" +
    salary +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllemployee = function (callback) {
  var query = "select * from employee";
  con.query(query, callback);
};

module.exports.updateverify = function (email, email_status, callback) {
  var query =
    "update `users` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};

module.exports.add_dept = function (name, desc, callback) {
  var query =
    "insert into departments(department_name,department_desc) values ('" +
    name +
    "','" +
    desc +
    "')";
  con.query(query, callback);
};

module.exports.getalldept = function (callback) {
  var query = "select * from departments";
  con.query(query, callback);
};

module.exports.delete_department = function (id, callback) {
  var query = "delete from departments where id=" + id;
  con.query(query, callback);
};

module.exports.getdeptbyId = function (id, callback) {
  var query = "select * from departments where id=" + id;
  con.query(query, callback);
};

module.exports.edit_dept = function (id, name, desc, callback) {
  var query =
    "update departments set department_name='" +
    name +
    "',department_desc='" +
    desc +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};

module.exports.add_patient = function (
  first_name,
  last_name,
  passwordnum,
  dob,
  gender,
  address,
  phone,
  image,
  fname,
  callback
) {
  var query =
    "INSERT INTO `patient`(`first_name`,`last_name`,`passwordnum`,`dob`,`gender`,`address`,`phone`,`image`,`fname`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    passwordnum +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    fname +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllpatient = function (callback) {
  var query = "select * from patient";
  con.query(query, callback);
};

module.exports.getpatientbyId = function (id, callback) {
  var query = "select * from patient where id =" + id;
  con.query(query, callback);
};

module.exports.editpatient = function (
  id,
  first_name,
  last_name,
  passwordnum,
  dob,
  gender,
  address,
  phone,
  image,
  fname,
  callback
) {
  var query =
    "update `patient` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `passwordnum`='" +
    passwordnum +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "',`image`='" +
    image +
    "',`fname`='" +
    fname +
    "' where id=" +
    id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.deletepatient = function (id, callback) {
  var query = "delete from patient where id=" + id;
  con.query(query, callback);
};

module.exports.searchpatient = function (key, callback) {
  var query = 'SELECT  *from patient where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.add_payment = function (
  first_name,
  last_name,
  passwordnum,
  dob,
  gender,
  address,
  phone,
  image,
  fname,
  callback
) {
  var query =
    "INSERT INTO `patient`(`first_name`,`last_name`,`passwordnum`,`dob`,`gender`,`address`,`phone`,`image`,`fname`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    passwordnum +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    fname +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllpayment = function (callback) {
  var query = "select * from payment";
  con.query(query, callback);
};

module.exports.getpaymentbyId = function (id, callback) {
  var query = "select * from patient where id =" + id;
  con.query(query, callback);
};

module.exports.editpayment = function (
  id,callback
) {
  var query =
    "update patient set payment='" +
    "true" +
    "' where id=" +
    id 
  console.log(query);

  con.query(query,callback);
};
