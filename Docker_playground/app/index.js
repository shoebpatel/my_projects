const app = require("express")();
const appid = process.env.PORT || 9999;

app.get("/", (req,res) => 
res.send(`appid: ${appid} home page: says hello!`))
 
app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))
