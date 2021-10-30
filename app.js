const express=require('express')
const app=express()
const path=require('path')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine","hbs");
app.use(express.static('public'));
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
const fs=require('fs')
let data = fs.readFileSync('people4.json');
data = JSON.parse(data);

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/details',(req,res)=>{
    const sendData=[]
    for(i=0;i<data.length;i++){
        balance=''
        for(j=0;j<data[i].balance.length;j++){
            if (Number.isInteger(parseInt(data[i].balance[j])) ||data[i].balance[j]=='.' ){
                balance+=data[i].balance[j]
            }
        }
        balance=parseInt(balance)
        if(data[i].isActive && balance>=2000){
            sendData.push(data[i].name)
        }
    }
    res.render('details',{data:sendData})
})

app.get('/get-data/:lower/:upper',async(req,res)=>{
    lower=parseInt(req.params.lower);
    upper=parseInt(req.params.upper);
    let sendData=[]

    for(i=0;i<data.length;i++){
        balance=''
        for(j=0;j<data[i].balance.length;j++){
            if (Number.isInteger(parseInt(data[i].balance[j])) ||data[i].balance[j]=='.' ){
                balance+=data[i].balance[j]
            }
        }
        balance=parseInt(balance)
        if(balance>=lower &&balance<=upper){
            sendData.push(data[i].name)
        }
    }
    res.json(sendData)
})
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{console.log("conneced to server");})