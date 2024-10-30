const contactDetailsDiv = document.getElementById('contactDetails');

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

// nampilin data
const displayContactDetails = () => {
    const contactId = parseInt(getContactIdFromUrl(), 10);
    const contacts = getDataFromLocalStorage();
    const contact = contacts.find(item => item.id === contactId);

    if (contact) {
        contactDetailsDiv.innerHTML = `
            <p><strong>Full Name:</strong> ${contact.fullname}</p>
            <p><strong>Phone Number:</strong> ${contact.phone_number}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Address:</strong> ${contact.address}</p>
            <p><strong>Birthday:</strong> ${contact.birthday}</p>
            <p><strong>Tags:</strong> ${contact.tags}</p>
            <p><strong>Notes:</strong> ${contact.notes}</p>
        `;
    } else {
        contactDetailsDiv.innerHTML = '<p>Contact not found.</p>';
    }
};

// manggil function
displayContactDetails();