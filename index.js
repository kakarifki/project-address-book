document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const contactTableBody = document.getElementById('contactTableBody');
    const searchInput = document.getElementById('searchInput');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactModal = document.getElementById('contactModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutBtn = document.getElementById('closeAboutBtn');

    // About modal handlers
    aboutBtn.addEventListener('click', () => {
        aboutModal.showModal();
    });

    closeAboutBtn.addEventListener('click', () => {
        aboutModal.close();
    });

    // Close about modal when clicking outside
    aboutModal.addEventListener('click', (e) => {
        const dialogDimensions = aboutModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            aboutModal.close();
        }
    });


    // jika diklik add contact muncul dialog
    addContactBtn.addEventListener('click', () => {
        contactModal.showModal(); // Open modal
    });

    // jika diklik cancel maka menutup dan reset form
    cancelBtn.addEventListener('click', () => {
        addressForm.reset(); // reset inputs
        contactModal.close(); // Close modal
    });
    

    // event listener search
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        displayDataFromLocalStorage(query);
    });

    // fungsi delete
    const deleteContactById = (id) => {
        let contacts = getDataFromLocalStorage();
        // Filter kontak yang tidak cocok dengan ID yang akan dihapus
        contacts = contacts.filter(contact => contact.id !== id);
        
        // Simpan kembali kontak yang sudah difilter ke localStorage
        localStorage.setItem('formDataList', JSON.stringify(contacts));
        
        // Tampilkan kembali kontak yang ada setelah penghapusan
        displayDataFromLocalStorage(); // Tampilkan data setelah delete
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

    // show data
    const displayDataFromLocalStorage = (query = '') => {
        const dataList = getDataFromLocalStorage();
        const tagFilter = document.getElementById('tagFilter').value;
        contactTableBody.innerHTML = '';
        
        // Filter dataList berdasarkan query pencarian dan tag
        const filteredDataList = dataList.filter(data => {
            const matchesSearch = (
                data.fullname.toLowerCase().includes(query.toLowerCase()) ||
                data.phone_number.includes(query) ||
                data.email.toLowerCase().includes(query.toLowerCase()) ||
                data.address.toLowerCase().includes(query.toLowerCase())
            );
            const matchesTag = tagFilter === '' || data.tags === tagFilter;
            return matchesSearch && matchesTag;
        });

        if (filteredDataList.length > 0) {
            // Sort contacts alphabetically by name
            filteredDataList.sort((a, b) => a.fullname.localeCompare(b.fullname));

            filteredDataList.forEach((data) => {
                const card = document.createElement('div');
                card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'hover:shadow-lg', 'transition-shadow', 'duration-300');
                
                // Get initials for the avatar
                const initials = data.fullname
                    .split(' ')
                    .map(name => name[0])
                    .join('')
                    .toUpperCase();

                // Calculate age if birthday exists
                const age = data.birthday ? calculateAge(data.birthday) : '';
                
                card.innerHTML = `
                    <div class="p-4">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg mr-3">
                                ${initials}
                            </div>
                            <div>
                                <h3 class="font-semibold text-lg text-gray-800">${data.fullname}</h3>
                                <span class="text-sm text-gray-500">${data.tags || 'No tags'}</span>
                            </div>
                        </div>
                        <div class="space-y-2 text-sm text-gray-600">
                            <p class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                ${data.phone_number}
                            </p>
                            <p class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                ${data.email}
                            </p>
                            ${age ? `
                            <p class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                ${age} years old
                            </p>` : ''}
                        </div>
                    </div>
                    <div class="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                        <button class="text-blue-500 hover:text-blue-700 font-medium text-sm focus:outline-none" onclick="window.location.href='/contact-details/?id=${data.id}'">
                            View Details
                        </button>
                        <button class="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none" id="deleteContactBtn-${data.id}">
                            Delete
                        </button>
                    </div>
                `;

                // Add the card to the container
                contactTableBody.appendChild(card);

                // Add delete event listener
                const deleteBtn = document.getElementById(`deleteContactBtn-${data.id}`);
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    deleteContactById(data.id);
                    displayDataFromLocalStorage();
                });
            });
        } else {
            contactTableBody.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    No contacts found.
                </div>
            `;
        }
    };

    // Fungsi submit form
    const submitForm = (event) => {
        event.preventDefault();

        // Ambil nilai dari input form
        const fullname = document.getElementById('fullname').value;
        const phone_number = document.getElementById('phone_number').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const birthday = document.getElementById('birthday').value;
        const tags = document.getElementById('tags').value;
        const notes = document.getElementById('notes').value;

        // bikin id unique
        const contacts = getDataFromLocalStorage();
        const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

        // Buat objek Contact dan simpan ke localStorage
        const newContact = new Contact(newId, fullname, phone_number, email, address, birthday, tags, notes);
        saveDataToLocalStorage(newContact);

        // Tampilkan data terbaru
        displayDataFromLocalStorage();

        // Reset form setelah submit
        addressForm.reset();
        contactModal.close();
    };

    
    // Tambahkan event listener untuk submit form
    addressForm.addEventListener('submit', submitForm);


    // Tampilkan semua data saat halaman dimuat
    displayDataFromLocalStorage();
});