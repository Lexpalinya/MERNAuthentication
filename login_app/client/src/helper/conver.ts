export default function converToBase64(file:File)
{
    return new Promise((resolve,resject)=>{

        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            resject(error)
        }
    })
   
}