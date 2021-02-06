let config;
if(process.env.NODE_ENV === 'dev'){
    config = {}
}else{
    config = {
        publicPath:'/caroltree/20210130_year/dist/'
    }
}
module.exports  = config;
