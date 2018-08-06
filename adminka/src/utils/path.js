let URL = "http://localhost:3001";
if (process.env.NODE_ENV === 'production'){
    URL = "http://77.120.123.202:3001";    
}

export default URL;