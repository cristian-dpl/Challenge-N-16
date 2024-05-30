// punto 3
// punto 5
// punto 6
// punto 8
document.addEventListener('DOMContentLoaded', () => {
    const saveContact = (data) => {
        let existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        if (data.contactId) {
            existingContacts[data.contactId] = data;
        } else {
            existingContacts.push(data);
        }
        localStorage.setItem("contacts", JSON.stringify(existingContacts));
        loadContacts();
    }
    
    // punto 7
    const deleteContact = (contactId) => {
        const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        existingContacts.splice(contactId, 1);
        localStorage.setItem("contacts", JSON.stringify(existingContacts));
        loadContacts();
    }
    
    const loadContacts = () => {
        const contactList = document.getElementById("contactList");
        contactList.innerHTML = '';
        const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        existingContacts.forEach((contact, index) => {
            if (contact !== null) {
                let listItem = document.createElement("li");
                let contactInfo = document.createElement("div");
            
                let idElement = document.createElement("div");
                idElement.innerHTML = "<b>ID:</b> " + index ;
                contactInfo.appendChild(idElement);
            
                let nameElement = document.createElement("div");
                nameElement.innerHTML = `<b>Nombre:</b> ${contact.name}`;
                contactInfo.appendChild(nameElement);
            
                let emailElement = document.createElement("div");
                emailElement.innerHTML = `<b>Correo:</b> ${contact.email}`;
                contactInfo.appendChild(emailElement);
            
                let birthdateElement = document.createElement("div");
                birthdateElement.innerHTML = `<b>Fecha de nacimineto:</b> ${contact.birthdate}`;
                contactInfo.appendChild(birthdateElement);
                // punto 2
                const deleteButton = document.createElement("button");
                deleteButton.classList = "btnDelete"
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => {
                    deleteContact(index);
                });
        
                const editButton = document.createElement("button");
                editButton.textContent = "Editar";
                editButton.addEventListener("click", () => {
                    document.getElementById("name").value = contact.name;
                    document.getElementById("email").value = contact.email;
                    document.getElementById("birthdate").value = contact.birthdate;
                    document.getElementById("contactId").value = index;
                });
                
                listItem.appendChild(contactInfo);
                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
                contactList.appendChild(listItem);
            }
        });
    }
    
    const validateForm = (e) => {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let birthdate = document.getElementById("birthdate").value;
        if (!name || !email || !birthdate) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        let formData = {
            name: name,
            email: email,
            birthdate: birthdate,
            contactId: document.getElementById("contactId").value 
        };
        saveContact(formData);
        document.getElementById("contactForm").reset();
    }
    
    document.getElementById("contactForm").addEventListener("submit", validateForm);

    loadContacts();
})





