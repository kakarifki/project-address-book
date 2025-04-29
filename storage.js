// bikin class contact (yang diajarin mas ipung)
class Contact {
    constructor(id, fullname, phone_number, email, address, company, tags, notes) {
        this.id = id;
        this.fullname = fullname;
        this.phone_number = phone_number;
        this.email = email;
        this.address = address;
        this.company = company;
        this.tags = tags;
        this.notes = notes;
    }
}

// save data ke local storage
const saveDataToLocalStorage = (data) => {
    const existingData = JSON.parse(localStorage.getItem('formDataList')) || [];
    existingData.push(data);
    localStorage.setItem('formDataList', JSON.stringify(existingData));
};

// get data dari local storage (nyoba try catch)
const initializeDummyData = () => {
    const dummyContacts = [
        new Contact(1, 'John Doe', '08123456789', 'john@example.com', '123 Main St', 'Acme Inc', 'work', 'Important client'),
        new Contact(2, 'Jane Smith', '08987654321', 'jane@example.com', '456 Oak Ave', 'Tech Corp', 'family', 'Team lead'),
        new Contact(3, 'Rizal Johnson', '08765432109', 'rizal@example.com', '789 Pine Rd', 'Global LLC', 'friend', 'Marketing manager')
    ];
    localStorage.setItem('formDataList', JSON.stringify(dummyContacts));
};

const getDataFromLocalStorage = () => {
    try {
        const storedData = localStorage.getItem('formDataList');
        if (!storedData || JSON.parse(storedData).length === 0) {
            initializeDummyData();
            return getDataFromLocalStorage();
        }
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
        return []; // Kembalikan array kosong jika terjadi kesalahan
    }
};

