document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const outputDiv = document.getElementById('content-container');

    // show data
    const displayDataFromLocalStorage = () => {
        const dataList = getDataFromLocalStorage();
        outputDiv.innerHTML = '';

        if (dataList.length > 0) {
            dataList.forEach((data, index) => {
                // Buat div container untuk setiap kontak
                const contactDiv = document.createElement('div');
                contactDiv.classList.add('contact'); // Tambahkan kelas untuk styling jika perlu

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

                // event listener clik
                contactDiv.addEventListener('click', () => {
                    window.location.href = `/contact-details/?id=${data.id}`;
                 });    

                // Tambahkan contactDiv ke dalam outputDiv
                outputDiv.appendChild(contactDiv);
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