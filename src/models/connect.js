import {Sequelize} from "sequelize";	
import config from "../config/config.js"	
	
const sequelize = new Sequelize (
config.database,  
config.user, 
config.pass, 
{	
host : config.host,	
port : config.port,	
dialect : config.dialect,	
});	
export default sequelize;	



//Kiem tra ket noi
// try{
//     await sequelize.authenticate();
//     console.log('connect database successfully')
//     }catch(err){
//     console.log('connect database fail', err)
//     }