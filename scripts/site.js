console.log(`Script loaded : ${pi12}`);

const submitButton = document.getElementById("submit");
const contactsDiv = document.getElementById("contacts");

if (!submitButton) {
    throw Error("No button with id 'submit'");
}

if (!contactsDiv) {
    throw Error("No div with id 'contacts'");
}

function deleteContact(e){
    const button = e.target;
    button.removeEventListener('click', deleteContact);
    const currentCard = e.target.closest(".carte");
    contactsDiv.removeChild(currentCard);
}

submitButton.addEventListener(`click`, function (e) {
    e.preventDefault();
    const data = GetFormData();

    console.log(e);   

    const cartes = document.querySelectorAll(".carte");

    let found = false;
    cartes.values().forEach(carte => found = !found ? Compare(carte, data) : true);

    if (found) {
        alert("Le contact existe déjà!");
        return;
    }

    AddCard(contactsDiv, data);
});


function AddCard(contacts, data) {
    const carte = document.createElement("div");
    carte.className = "carte";

    const fullName = document.createElement("p");
    const fullNameLabel = document.createElement("span");
    fullNameLabel.innerText = 'Nom complet : ';
    const spanNom = document.createElement("span");
    spanNom.className = "nom";
    spanNom.innerText = data.nom;
    const spanPrenom = document.createElement("span");
    spanPrenom.className = "prenom";
    spanPrenom.innerText = data.prenom;

    fullName.appendChild(fullNameLabel);
    fullName.appendChild(spanNom);
    fullName.appendChild(spanPrenom);

    const email = document.createElement("p");
    const emailLabel = document.createElement("span");
    emailLabel.textContent = "Email : ";
    const spanEmail = document.createElement("span");
    spanEmail.className = "email";
    spanEmail.innerText = data.email;
    email.appendChild(emailLabel);
    email.appendChild(spanEmail);

    const tel = document.createElement("p");
    const telLabel = document.createElement("span");
    telLabel.textContent = "Tel : ";
    const spanTel = document.createElement("span");
    spanTel.className = "tel";
    spanTel.innerText = data.tel;
    tel.appendChild(telLabel);
    tel.appendChild(spanTel);

    const deleteButton = document.createElement("button");
    deleteButton.innerText= "Delete";
    deleteButton.addEventListener('click', deleteContact);

    carte.appendChild(fullName);
    carte.appendChild(email);
    carte.appendChild(tel);
    carte.appendChild(deleteButton);

    contacts.appendChild(carte);
}

function Compare(div, data) {
    const spanNom = div.querySelector(".nom");
    const spanPrenom = div.querySelector(".prenom");
    const spanEmail = div.querySelector(".email");
    const spanTel = div.querySelector(".tel");

    const current = { 
        nom: spanNom.innerText.trim(),
        prenom: spanPrenom.innerText.trim(),
        email: spanEmail.innerText.trim(),
        tel: spanTel.innerText.trim(),
    }

    const compare = current.nom.toUpperCase() === data.nom.toUpperCase() &&
        current.prenom.toUpperCase() === data.prenom.toUpperCase() &&
        current.email.toUpperCase() === data.email.toUpperCase() &&
        current.tel.toUpperCase() === data.tel.toUpperCase();

    console.log(`current : `, current);
    console.log(`data : `, data);
    console.log(`compare : ${compare}`);
    
    return compare;
}

function GetFormData() {
    const inputNom = document.getElementById("nom");
    const inputPrenom = document.getElementById("prenom");
    const inputEmail = document.getElementById("email");
    const inputTel = document.getElementById("tel");

    return {
        nom: inputNom.value.trim(),
        prenom: inputPrenom.value.trim(),
        email: inputEmail.value.trim(),
        tel: inputTel.value.trim(),
    }
}