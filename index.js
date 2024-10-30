document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const outputDiv = document.getElementById('content-container');

    // show data
    const displayDataFromLocalStorage = () => {
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

    // Fungsi untuk menangani submit form
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

        // Buat objek Contact dan simpan ke localStorage
        const newContact = new Contact(fullname, phone_number, email, address, birthday, tags, notes);
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