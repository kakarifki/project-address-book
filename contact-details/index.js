const contactDetailsDiv = document.getElementById('contactDetails');
// const deleteContactBtn = document.getElementById('deleteContactBtn');

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
            <p><strong>Tags:</strong> ${contact.tags}</p>
            <p><strong>Notes:</strong> ${contact.notes}</p>
            <button id="deleteContactBtn" class="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">Delete Contact</button>
            <button id="editContactBtn" class="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Edit Contact</button>
        `;

        // event listener click delete
deleteContactBtn.addEventListener('click', () => {
    const contactId = parseInt(getContactIdFromUrl(), 10);
    deleteContactById(contactId);
});

//fitur edit kontak
document.getElementById('editContactBtn').addEventListener('click', () => {
    editContact(contact);
});


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


// fitur edit kontak
function editContact(contact) {
    // Buat form input untuk mengedit data kontak
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <h3 class="text-xl font-semibold mb-4">Edit Contact</h3>
        
        <div class="mb-4">
            <label for="editFullName" class="block text-sm font-medium text-gray-700">Full Name:</label>
            <input type="text" id="editFullName" value="${contact.fullname}" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mb-4">
            <label for="editPhoneNumber" class="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input type="text" id="editPhoneNumber" value="${contact.phone_number}" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mb-4">
            <label for="editEmail" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="text" id="editEmail" value="${contact.email}" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mb-4">
            <label for="editAddress" class="block text-sm font-medium text-gray-700">Address:</label>
            <input type="text" id="editAddress" value="${contact.address}" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mb-4">
            <label for="editTags" class="block text-sm font-medium text-gray-700">Tags:</label>
            <input type="text" id="editTags" value="${contact.tags}" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div class="mb-4">
            <label for="editNotes" class="block text-sm font-medium text-gray-700">Notes:</label>
            <textarea id="editNotes" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">${contact.notes}</textarea>
        </div>

        <div class="flex space-x-4">
            <button id="saveEditBtn" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Save Changes
            </button>
            <button id="cancelEditBtn" class="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200">
                Cancel
            </button>
        </div>
    `;
    
    const contactDetailsDiv = document.getElementById('contactDetails');
    contactDetailsDiv.innerHTML = '';
    contactDetailsDiv.appendChild(editForm);

    // Save changes
    document.getElementById('saveEditBtn').addEventListener('click', () => {
        contact.fullname = document.getElementById('editFullName').value;
        contact.phone_number = document.getElementById('editPhoneNumber').value;
        contact.email = document.getElementById('editEmail').value;
        contact.address = document.getElementById('editAddress').value;

        contact.tags = document.getElementById('editTags').value;
        contact.notes = document.getElementById('editNotes').value;

        updateContactInLocalStorage(contact);
        window.location.href = `/contact-details/?id=${contact.id}`;
    });

    // Cancel edit
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        window.location.href = `/contact-details/?id=${contact.id}`;
    });
}

// Fungsi save edited
function updateContactInLocalStorage(updatedContact) {
    const contacts = getDataFromLocalStorage();
    const contactIndex = contacts.findIndex(contact => contact.id === updatedContact.id);

    if (contactIndex !== -1) {
        contacts[contactIndex] = updatedContact;
        localStorage.setItem('formDataList', JSON.stringify(contacts));
    }
}

// manggil function
displayContactDetails();