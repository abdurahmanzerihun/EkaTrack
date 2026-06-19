import express,{Request,Response} from 'express';
const app =express();
const PORT=process.env.PORT||4000;

app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
        res.send("The shop server is working ");
        
});

app.listen(PORT,()=>{
        console.log(`The app is working on port ${PORT}` );
});
