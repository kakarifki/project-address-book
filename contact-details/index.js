const contactDetailsDiv = document.getElementById('contactDetails');
const deleteContactBtn = document.getElementById('deleteContactBtn');

// search id dari url
const getContactIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

// get data dari local storage
const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('formDataList');
    return data ? JSON.parse(data) : [];
};

// fungsi menghitung age
const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Jika belum ulang tahun di tahun ini
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// nampilin data
const displayContactDetails = () => {
    const contactId = parseInt(getContactIdFromUrl(), 10);
    const contacts = getDataFromLocalStorage();
    const contact = contacts.find(item => item.id === contactId);

    if (contact) {

        const age = calculateAge(contact.birthday);
        console.log(age)
        contactDetailsDiv.innerHTML = `
            <p><strong>Full Name:</strong> ${contact.fullname}</p>
            <p><strong>Phone Number:</strong> ${contact.phone_number}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Address:</strong> ${contact.address}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Tags:</strong> ${contact.tags}</p>
            <p><strong>Notes:</strong> ${contact.notes}</p>
        `;
    } else {
        contactDetailsDiv.innerHTML = '<p>Contact not found.</p>';
    }
};

// fitur hapus kontak dan langsung kembali ke home
const deleteContactById = (id) => {
    const contacts = getDataFromLocalStorage();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('formDataList', JSON.stringify(updatedContacts));
    window.location.href = '/';
}

// event listener click delete
deleteContactBtn.addEventListener('click', () => {
    const contactId = parseInt(getContactIdFromUrl(), 10);
    deleteContactById(contactId);
});

// manggil function
displayContactDetails();