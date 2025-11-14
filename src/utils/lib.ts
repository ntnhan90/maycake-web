
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path:string) =>{
    return path.startsWith('/') ? path.slice(1) : path
}

export function capitalizedWord(str:string){
    return str.replace(/-|\b\w/g,(match) => {
        if(match === "-" ){
            return " ";
        }
        return match.toUpperCase();
    });
}