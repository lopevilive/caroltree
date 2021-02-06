let dirPath = '';
if(process.env.NODE_ENV === 'dev'){
    dirPath = '/'
}else{
    dirPath = '/caroltree/20210130_year/'
}
interface Window {
    dirPath:string;
}
window.dirPath = dirPath;