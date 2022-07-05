
export default function GrabFile(){
    const fileName = document.getElementById("fileUpload").value
    if(fileName === ''){
        alert("No File Detected")
    } else {
        alert(fileName)
    }
    
    
}