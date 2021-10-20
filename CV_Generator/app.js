const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");

var obj = {
  name: "",
  workExp: "",
  education: "",
  hobby1: "",
  hobby2: "",
  hobby3: "",
  hobby4: "",
  skill1: "",
  skill2: "",
  skill3: "",
  cert1: "",
  cert2: "",
  hobbydetails: {
    hobby1: "",
    hobby2: "",
    hobby3: "",
  },
  skill1details: {
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  },
  skill2details: {
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  },
  skill3details: {
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  },
  certificatedetails: {
    cert1: "",
    cert2: "",
  },
  socials: {
    insta: "",
    twitter: "",
    linkedin: "",
    facebook: "",
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("form.ejs");
});
app.get("/cv", (req, res) => {
  res.render("index.ejs", {
    name: obj.name,
    education: obj.education,
    workExp: obj.workExp,
    hobby1: obj.hobby1,
    hobby2: obj.hobby2,
    hobby3: obj.hobby3,
    hobby4: obj.hobby4,
    skill1: obj.skill1,
    skill2: obj.skill2,
    skill3: obj.skill3,
    cert1: obj.cert1,
    cert2: obj.cert2,
    hobbydetails: obj.hobbydetails,
    skill1details: obj.skill1details,
    skill2details: obj.skill2details,
    skill3details: obj.skill3details,
    certificatedetails: obj.certificatedetails,
    socials: obj.socials,
  });
});
function handleSubmit() {
  console.log("submitted");
}
app.post("/handler", (req, res) => {
  const {
    name,
    workExp,
    education,
    hobby1,
    hobby2,
    hobby3,
    hobby4,
    skill1,
    skill2,
    skill3,
    cert1,
    cert2,
    hobbydetails,
    skill1details,
    skill2details,
    skill3details,
    certificatedetails,
    socials,
  } = req.body;
  obj.name = name;
  obj.workExp = workExp;
  obj.education = education;
  obj.hobby1 = hobby1;
  obj.hobby2 = hobby2;
  obj.hobby3 = hobby3;
  obj.hobby4 = hobby4;
  obj.skill1 = skill1;
  obj.skill2 = skill2;
  obj.skill3 = skill3;
  obj.cert1 = cert1;
  obj.cert2 = cert2;

  const arr6 = socials.split(/\r?\n/);
  obj.socials.insta = arr6[0];
  obj.socials.twitter = arr6[1];
  obj.socials.linkedin = arr6[2];
  obj.socials.facebook = arr6[3];
  const arr1 = hobbydetails.split(/\r?\n/);
  obj.hobbydetails.hobby1 = arr1[0];
  obj.hobbydetails.hobby2 = arr1[1];
  obj.hobbydetails.hobby3 = arr1[2];
  obj.hobbydetails.hobby4 = arr1[3];
  //hobby details
  const arr2 = skill1details.split(/\r?\n/);
  obj.skill1details.point1 = arr2[0];
  obj.skill1details.point2 = arr2[1];
  obj.skill1details.point3 = arr2[2];
  obj.skill1details.point4 = arr2[3];
  obj.skill1details.point5 = arr2[4];
  //skill1details
  const arr3 = skill2details.split(/\r?\n/);
  obj.skill2details.point1 = arr3[0];
  obj.skill2details.point2 = arr3[1];
  obj.skill2details.point3 = arr3[2];
  obj.skill2details.point4 = arr3[3];
  obj.skill2details.point5 = arr3[4];
  //skill2details
  const arr4 = skill3details.split(/\r?\n/);
  obj.skill3details.point1 = arr4[0];
  obj.skill3details.point2 = arr4[1];
  obj.skill3details.point3 = arr4[2];
  obj.skill3details.point4 = arr4[3];
  obj.skill3details.point5 = arr4[4];
  //skill3details
  const arr5 = certificatedetails.split(/\r?\n/);
  obj.certificatedetails.cert1 = arr5[0];
  obj.certificatedetails.cert2 = arr5[1];
  res.redirect("/cv");
});
app.listen("3000", (req, res) => {
  console.log("server on 3000");
});
