import express,{Express} from "express"
import cors from "cors"
import morgan from 'morgan';
import connect from "./database/conn";
import router   from "./router/router";


const app:Express=express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request")
})

app.use('/api',router)



const port=8080



/** start server only when we have valid connection**/
connect().then(()=>{
    try {
        app.listen(port,()=>{
         console.log(`server connected to http://localhost:${port}`)
        })
        
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error=>{
    console.log("Invalid database connection...!",error)

})