// const contacts = [
//   {
//     id: 1,
//     fullname: "rifki",
//     phone_number: "6289614241442",
//     email: "rifki@gmill.com",
//     address: "Setu, Bekasi",
//     age: 20,
//     tags: "Friends",
//     others: "",
//   },
//   {
//     id: 2,
//     fullname: "Dimas",
//     phone_number: "6289612341243",
//     email: "dimas@gmail.com",
//     address: "Jakarta Timur, DKI Jakarta",
//     age: 21,
//     tags: "Collagues",
//     others: "HRD Staff",
//   },
//   {
//     id: 3,
//     fullname: "Boy Tobing",
//     phone_number: "6281312341234",
//     email: "Boy@gmail.com",
//     address: "Bogor, Jawa Barat",
//     age: 22,
//     tags: "Family",
//     others: "Cousin",
//   },
// ];
// console.log(contacts);

// fungtion untuk menambahkan kontak baru
const addContact = (
  fullname,
  phone_number,
  email,
  address,
  age,
  tags,
  others
) => {
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
  addContact(
    "Dini Nurdini",
    "628765432123",
    "dini@gmail.com",
    "Jombang, Jawa Timur",
    25,
    "Friends",
    "Orang Jawa Timur"
  );
} catch (error) {
  console.error("Error Input Data");
} finally {
  console.log("Proses Add Data selesai");
}

//DOM
document.addEventListener("DOMContentLoaded", () => {
  const numberInput = document.getElementById("numberInput");
  const itemList = document.getElementById("itemList");
  const addButton = document.getElementById("addButton");
  const changeBGButton = document.getElementById("changeBGButton");
  const divSisiKiri = document.getElementById("divSisiKiri");
  const changePaddingButton = document.getElementById("changePaddingButton");
  const addressForm = document.getElementById("addressForm");
  const outputDiv = document.getElementById("output");

  let editingIndex = -1;
  // kirim data ke local storage
  const saveDataToLocalStorage = (data) => {
    const existingData = JSON.parse(localStorage.getItem("formDataList")) || [];
    existingData.push(data);
    localStorage.setItem("formDataList", JSON.stringify(existingData));
  };

  // load data dari local storage
  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("formDataList");
    return storedData ? JSON.parse(storedData) : [];
  };

  const displayDataFromLocalStorage = () => {
    const dataList = getDataFromLocalStorage();
    // outputDiv.innerHTML = "";

    if (dataList.length > 0) {
      dataList.forEach((data, index) => {
        // Tambahkan setiap entri ke dalam output
        outputDiv.innerHTML += `<p><strong>Data ${index + 1}</strong></p>`;
        outputDiv.innerHTML += `<p><strong>Nama:</strong> ${data.nama}</p>`;
        outputDiv.innerHTML += `<p><strong>Alamat:</strong> ${data.alamat}</p><hr>`;
      });
    } else {
      outputDiv.innerHTML = "<p>Data tidak tersedia.</p>";
    }
  };

  const addListItems = () => {
    const itemCount = parseInt(numberInput.value, 10);
    const existingItems = itemList.getElementsByTagName("li").length;
    console.log(existingItems); // Ngecek existing berapa banyak

    for (let i = 1; i <= itemCount; i++) {
      const li = document.createElement("li");
      li.textContent = `Item ${existingItems + i}`;
      itemList.appendChild(li);
    }
  };

  // try {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(addressForm);
    const nama = formData.get("nama");
    const alamat = formData.get("alamat");

    const newAddress = { nama, alamat };
    console.log("newAddress", newAddress);
    saveDataToLocalStorage(newAddress);
    
    displayDataFromLocalStorage();
    addressForm.reset();
  }
  // } catch (error) {
  //   console.log("error")
  // }


  function addEditDeleteButtons(li) {
    const buttonsDiv = document.createElement("div");

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.className = "bg-yellow-500 text-white";
    editButton.onclick = () => editItem(li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "bg-red-500 text-white";
    deleteButton.onclick = () => deleteItem(li);

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
  }

  function editItem(li) {
    const [name, address] = li.firstChild.textContent.split("-");
  }

  addressForm.addEventListener("submit", handleSubmit);
  // if (editingIndex === -1)

  addButton.addEventListener("click", addListItems);

  displayDataFromLocalStorage();

  changeBGButton.addEventListener("click", () => {
    divSisiKiri.classList.toggle("bg-yellow-500");
  });

  changePaddingButton.addEventListener("click", () => {
    divSisiKiri.classList.toggle("p-2");
  });
});
