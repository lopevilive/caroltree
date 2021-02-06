let dirPath = '';
if(process.env.NODE_ENV === 'dev'){
    dirPath = '/'
}else{
    dirPath = '/caroltree/20210130_year/dist/'
}
interface Window {
    dirPath:string;
}
window.dirPath = dirPath;