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

