const numberA = 20;
const numberB = 25;
console.log(`hasilnya adalah: ${numberA + numberB}`)  //gunakan backtick

function getAge(year) {
    console.log("umur saya adalah", 2024 - year)
}

getAge(2000)

function getName(nama) {
    return nama;
}

const getName2 = (nama) => {  
    return nama;                // kalo return bisa buat manggil 
}

fullName = getName2("arjay")
console.log(fullName)