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
