import mongoose from "mongoose";


export const Connection=(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@speakhub.trxbobv.mongodb.net/?retryWrites=true&w=majority`
    try{

        mongoose.connect(URL,{ 
            useUnifiedTopology:true,
            useNewUrlParser:true,
            
        
        
        })
        console.log('database connected succesfully');

    }catch(error){
        console.log('Error while connection database is',error.meassage);
    }
}