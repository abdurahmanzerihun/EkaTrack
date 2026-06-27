import express,{Request,Response,NextFunction} from 'express';
import { Role } from './generated/prisma/enums';
const app =express();
const PORT=process.env.PORT||4000;

//import routes
import authRoutes from './routes/auth-routes';
import categoryRoutes from './routes/category-routes';
import productRoutes from './routes/product-routes';


//middlewares
app.use(express.json());


app.use('/api/auth/',authRoutes);
app.use('/api/auth/',authRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/products',productRoutes);

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
