const contacts = [
  {
    id: 1,
    fullname: "rifki",
    phone_number: "6289614241442",
    email: "rifki@gmill.com",
    address: "Setu, Bekasi",
    age: 20,
    tags: "Friends",
    others: "",
  },
  {
    id: 2,
    fullname: "Dimas",
    phone_number: "6289612341243",
    email: "dimas@gmail.com",
    address: "Jakarta Timur, DKI Jakarta",
    age: 21,
    tags: "Collagues",
    others: "HRD Staff",
  },
  {
    id: 3,
    fullname: "Boy Tobing",
    phone_number: "6281312341234",
    email: "Boy@gmail.com",
    address: "Bogor, Jawa Barat",
    age: 22,
    tags: "Family",
    others: "Cousin",
  },
];
console.log(contacts);

// fungtion untuk menambahkan kontak baru 
const addContact = (fullname, phone_number, email, address, age, tags, others) => {
  // Cari id terakhir dalam array dan tambahkan 1
  const lastId = contacts.length ? contacts[contacts.length - 1].id : 0;
  const newId = lastId + 1;

  // Buat objek kontak baru
  const newContact = {
    id: newId,
    fullname: fullname,
    phone_number: phone_number,
    email: email,
    address: address,
    age: age,
    tags: tags,
    others: others || "", // fungsi OR, optional jika tidak ada data others
  };

  // Tambahkan kontak baru ke array
  contacts.push(newContact);

  // Tampilkan data terbaru
  console.log("Kontak baru ditambahkan:", newContact);
  console.log("Daftar kontak terbaru:", contacts);
};

// const dataBaru = 
try {
  addContact("Dini Nurdini", "628765432123", "dini@gmail.com", "Jombang, Jawa Timur", 25, "Friends", "Orang Jawa Timur")  
} catch (error) {
  console.error("Error Input Data")
} finally {
  console.log("Proses Add Data selesai")
}

//DOM
document.addEventListener('DOMContentLoaded', () => {

const numberInput = document.getElementById('numberInput');
const itemList = document.getElementById('itemList');
const addButton = document.getElementById('addButton');
const changeBGButton = document.getElementById('changeBGButton');
const divSisiKiri = document.getElementById('divSisiKiri');
const changePaddingButton = document.getElementById('changePaddingButton');
const addressForm = document.getElementById('addressForm')

const addListItems = () => {
  const itemCount = parseInt(numberInput.value, 10);
  const existingItems = itemList.getElementsByTagName('li').length;
  console.log(existingItems) // Ngecek existing berapa banyak


  for (let i = 1; i <= itemCount; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${existingItems + i}`;
    itemList.appendChild(li);
  }
}

addButton.addEventListener('click', addListItems)

changeBGButton.addEventListener('click', () => {
  divSisiKiri.classList.toggle('bg-yellow-500');
})

changePaddingButton.addEventListener('click', () => {
  divSisiKiri.classList.toggle('p-2');
})
})