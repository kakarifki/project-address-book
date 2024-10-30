document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const outputDiv = document.getElementById('content-container');
    const searchInput = document.getElementById('searchInput');

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

                // hitung umur
                const age = calculateAge(data.birthday);
                
                // Masukkan informasi kontak ke dalam contactDiv
                contactDiv.innerHTML = `
                    <p><strong>Contact ${index + 1}</strong></p>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Full Name:</strong> ${data.fullname}</p>
                    <p><strong>Phone Number:</strong> ${data.phone_number}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Age:</strong> ${age}</p>
                    <p><strong>Tags:</strong> ${data.tags}</p>
                    <p><strong>Notes:</strong> ${data.notes}</p>
                    <button data-id="${data.id}" style="background-color: red; color: white; padding: 5px 10px; border: none; cursor: pointer;">Delete</button>
                    <hr>
                `;

                // event listener clik
                contactDiv.addEventListener('click', () => {
                    window.location.href = `/contact-details/?id=${data.id}`;
                });  

                // nambahin contactDiv ke dalam outputDiv
                outputDiv.appendChild(contactDiv);

                // event listener delete
                const deleteBtn = contactDiv.querySelector('button[data-id]');
                deleteBtn.addEventListener('click', () => {
                deleteContactById(data.id);
            });
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