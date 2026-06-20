import express,{Request,Response,NextFunction} from 'express';
const app =express();
const PORT=process.env.PORT||4000;

//import routes
import authRoutes from './routes/authRoutes';

//middlewares
app.use(express.json());


app.use('/api/auth/',authRoutes);
app.get('/',(req:Request,res:Response)=>{
        res.send("The shop server is working ");
        
});

//async catch
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("System Error:", err.message);
  
  res.status(500).json({ 
    message: "An unexpected database or server error occurred." 
  });
});

app.listen(PORT,()=>{
        console.log(`The app is working on port ${PORT}` );
});
