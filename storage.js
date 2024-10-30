// bikin class contact (yang diajarin mas ipung)
class Contact {
    constructor(fullname, phone_number, email, address, birthday, tags, notes) {
        this.fullname = fullname;
        this.phone_number = phone_number;
        this.email = email;
        this.address = address;
        this.birthday = birthday;
        this.tags = tags;
        this.notes = notes;
    }
}

// save data ke local storage
const saveDataToLocalStorage = (contact) => {
    const existingData = JSON.parse(localStorage.getItem('contactList')) || [];
    existingData.push(contact);
    localStorage.setItem('contactList', JSON.stringify(existingData));
};

// get data dari local storage (nyoba try catch)
const getDataFromLocalStorage = () => {
    try {
        const storedData = localStorage.getItem('formDataList');
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
        return []; // Kembalikan array kosong jika terjadi kesalahan
    }
};

// Fungsi untuk menampilkan semua data dari localStorage
const displayDataFromLocalStorage = (outputDiv) => {
    const dataList = getDataFromLocalStorage();
    outputDiv.innerHTML = '';

    if (dataList.length > 0) {
        dataList.forEach((data, index) => {
            outputDiv.innerHTML += `<p><strong>Contact ${index + 1}</strong></p>`;
            outputDiv.innerHTML += `<p><strong>Full Name:</strong> ${data.fullname}</p>`;
            outputDiv.innerHTML += `<p><strong>Phone Number:</strong> ${data.phone_number}</p>`;
            outputDiv.innerHTML += `<p><strong>Email:</strong> ${data.email}</p>`;
            outputDiv.innerHTML += `<p><strong>Address:</strong> ${data.address}</p>`;
            outputDiv.innerHTML += `<p><strong>Birthday:</strong> ${data.birthday}</p>`;
            outputDiv.innerHTML += `<p><strong>Tags:</strong> ${data.tags}</p>`;
            outputDiv.innerHTML += `<p><strong>Notes:</strong> ${data.notes}</p><hr>`;
        });
    } else {
        outputDiv.innerHTML = '<p>Data tidak tersedia.</p>';
    }
};