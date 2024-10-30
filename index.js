document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const outputDiv = document.getElementById('content-container');
    const searchInput = document.getElementById('searchInput');

    // event listener search
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        displayDataFromLocalStorage(query);
    });

    // show data
    const displayDataFromLocalStorage = (query = '') => {
        const dataList = getDataFromLocalStorage();
        outputDiv.innerHTML = '';
        
    // Filter dataList berdasarkan query pencarian
    const filteredDataList = dataList.filter(data => {
        return (
            data.fullname.toLowerCase().includes(query) ||
            data.phone_number.includes(query) ||
            data.email.toLowerCase().includes(query) ||
            data.address.toLowerCase().includes(query)
        );
    });

        if (filteredDataList.length > 0) {
            filteredDataList.forEach((data, index) => {
                // Buat div container untuk setiap kontak
                const contactDiv = document.createElement('div');
                
                // Masukkan informasi kontak ke dalam contactDiv
                contactDiv.innerHTML = `
                    <p><strong>Contact ${index + 1}</strong></p>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Full Name:</strong> ${data.fullname}</p>
                    <p><strong>Phone Number:</strong> ${data.phone_number}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Birthday:</strong> ${data.birthday}</p>
                    <p><strong>Tags:</strong> ${data.tags}</p>
                    <p><strong>Notes:</strong> ${data.notes}</p>
                    <hr>
                `;

                // nambahin contactDiv ke dalam outputDiv
                outputDiv.appendChild(contactDiv);
            });
        } else {
            outputDiv.innerHTML = '<p>Data tidak tersedia.</p>';
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
    };

    
    // Tambahkan event listener untuk submit form
    addressForm.addEventListener('submit', submitForm);

    // Tampilkan semua data saat halaman dimuat
    displayDataFromLocalStorage();
});