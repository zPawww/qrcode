var search = document.getElementById("buscador");
const imagen = document.querySelector(".imagen");
const form = document.getElementById("myform");
const descargar = document.querySelector(".descargar");

function id(){
        let value = search.value;
        if(value == ""){
            imagen.setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=@pawww`)
        } else {
            let datos = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`;
            imagen.removeAttribute("src");
            imagen.setAttribute("src", `${datos}`)

        }
}

form.addEventListener("submit", function(e) {
    e.preventDefault()
    id()
})

function downloadImage(){
    let value = search.value;
    let datos = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`;

    fetch(datos)
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = "qrcode.png";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => alert("Ocurrio un error en la descarga de la imagen."))
}

descargar.addEventListener("click", (() => {
    downloadImage()
}))