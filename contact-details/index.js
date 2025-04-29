const contactDetailsDiv = document.getElementById('contactDetails');
const contactNameDiv = document.getElementById('contactName');
const contactTagDiv = document.getElementById('contactTag');
const deleteContactBtn = document.getElementById('deleteContactBtn');
const editContactBtn = document.getElementById('editContactBtn');

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

// Get tag color based on tag value
const getTagColor = (tag) => {
    switch(tag) {
        case 'Family':
            return 'bg-green-100 text-green-800';
        case 'Friends':
            return 'bg-blue-100 text-blue-800';
        case 'Work':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// nampilin data
const displayContactDetails = () => {
    const contactId = parseInt(getContactIdFromUrl(), 10);
    const contacts = getDataFromLocalStorage();
    const contact = contacts.find(item => item.id === contactId);

    if (contact) {
        // Set contact name and tag
        contactNameDiv.textContent = contact.fullname;
        contactTagDiv.textContent = contact.tags || 'No Tag';
        contactTagDiv.className = `inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${getTagColor(contact.tags)}`;
        
        // Set contact details with icons
        contactDetailsDiv.innerHTML = `
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <i class="fas fa-phone text-blue-500"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Phone Number</p>
                    <p class="font-medium">${contact.phone_number}</p>
                </div>
            </div>
            
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-4">
                    <i class="fas fa-envelope text-green-500"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Email</p>
                    <p class="font-medium">${contact.email}</p>
                </div>
            </div>
            
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-4">
                    <i class="fas fa-building text-red-500"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Company</p>
                    <p class="font-medium">${contact.company || 'No company'}</p>
                </div>
            </div>
            
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mr-4">
                    <i class="fas fa-map-marker-alt text-yellow-500"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Address</p>
                    <p class="font-medium">${contact.address}</p>
                </div>
            </div>
            
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                    <i class="fas fa-sticky-note text-purple-500"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Notes</p>
                    <p class="font-medium">${contact.notes || 'No notes'}</p>
                </div>
            </div>
        `;

    } else {
        contactDetailsDiv.innerHTML = '<p class="text-center py-4">Contact not found.</p>';
    }

    // Add event listeners for delete and edit buttons
    if (deleteContactBtn) {
        deleteContactBtn.addEventListener('click', () => {
            const contactId = parseInt(getContactIdFromUrl(), 10);
            deleteContactById(contactId);
        });
    }

    if (editContactBtn) {
        editContactBtn.addEventListener('click', () => {
            editContact(contact);
        });
    }
};



// fitur hapus kontak dan langsung kembali ke home
const deleteContactById = (id) => {
    const contacts = getDataFromLocalStorage();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('formDataList', JSON.stringify(updatedContacts));
    window.location.href = '/';
}

// Initialize the page by displaying contact details
window.addEventListener('DOMContentLoaded', displayContactDetails);


// fitur edit kontak
function editContact(contact) {
    // Hide the contact name, tag, and buttons
    contactNameDiv.style.display = 'none';
    contactTagDiv.style.display = 'none';
    document.querySelector('.pt-6').style.display = 'none';
    
    // Buat form input untuk mengedit data kontak
    const editForm = document.createElement('div');
    editForm.className = 'bg-white rounded-lg p-4';
    editForm.innerHTML = `
        <h3 class="text-xl font-semibold mb-4 text-center">Edit Contact</h3>
        
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
            <select id="editTags" class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select a tag</option>
                <option value="Family" ${contact.tags === 'Family' ? 'selected' : ''}>Family</option>
                <option value="Friends" ${contact.tags === 'Friends' ? 'selected' : ''}>Friends</option>
                <option value="Work" ${contact.tags === 'Work' ? 'selected' : ''}>Work</option>
            </select>
        </div>

        <div class="mb-4">
            <label for="editNotes" class="block text-sm font-medium text-gray-700">Notes:</label>
            <textarea id="editNotes" 
                class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">${contact.notes}</textarea>
        </div>

        <div class="flex space-x-4 justify-center mt-6">
            <button id="saveEditBtn" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center">
                <i class="fas fa-save mr-2"></i> Save Changes
            </button>
            <button id="cancelEditBtn" class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center">
                <i class="fas fa-times mr-2"></i> Cancel
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
        
        // Restore the UI without page reload
        contactNameDiv.style.display = 'block';
        contactTagDiv.style.display = 'block';
        document.querySelector('.pt-6').style.display = 'flex';
        
        // Update the displayed information
        contactNameDiv.textContent = contact.fullname;
        contactTagDiv.textContent = contact.tags || 'No Tag';
        contactTagDiv.className = `inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${getTagColor(contact.tags)}`;
        
        // Refresh the contact details
        displayContactDetails();
    });

    // Cancel edit
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        // Restore the UI without page reload
        contactNameDiv.style.display = 'block';
        contactTagDiv.style.display = 'block';
        document.querySelector('.pt-6').style.display = 'flex';
        
        // Refresh the contact details
        displayContactDetails();
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