let tokenCount = 0; // Počet žetonů na začátku

// Funkce pro validaci registrace
function validateRegistration(event) {
    event.preventDefault(); // Zabránit obnovení stránky
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = document.getElementById('username').value;

    if (password !== confirmPassword) {
        alert("Hesla se neshodují!");
        return false;
    }

    // Inicializace tokenCount a zobrazení
    tokenCount = 200;
    updateTokenDisplay();

    alert("Registrace proběhla úspěšně! Získali jste 200 žetonů.");
    displayProfile();
    return false; // Zabránit obnovení stránky
}

// Funkce pro zobrazení profilu
function displayProfile() {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        document.getElementById('profileUsername').innerText = userData.username;
        tokenCount = userData.tokens; // Nastavení tokenCount na uloženou hodnotu
        updateTokenDisplay(); // Funkce pro aktualizaci zobrazení žetonů
        showSection('profile');
    }
}

// Funkce pro aktualizaci zobrazení žetonů
function updateTokenDisplay() {
    document.getElementById('token-count').innerText = tokenCount;
}

// Funkce pro zobrazení sekcí
function showSection(section) {
    const sections = ['registration', 'profile', 'chat'];
    sections.forEach(sec => {
        const element = document.getElementById(sec);
        if (element) {
            element.classList.add('hidden');
        }
    });

    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// Funkce pro přepnutí na chat
function showChat() {
    document.getElementById('token-count-chat').innerText = tokenCount; // Zobrazení žetonů v chatu
    showSection('chat');
}

// Funkce pro odeslání zprávy
function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageContainer = document.getElementById('message-container');

    const message = messageInput.value;
    if (message.trim() === '') return; // Neodesílat prázdné zprávy

    if (tokenCount < 30) { // Zkontrolovat, zda má uživatel dostatek žetonů
        alert("Nemáte dostatek žetonů na odeslání zprávy. Koupíte si je v sekci 'Koupit žetony'.");
        return; // Zastavit odeslání zprávy
    }

    // Přidat zprávu do kontejneru
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);

    tokenCount -= 30; // Odečíst 30 žetonů za odeslání zprávy
    updateTokenDisplay(); // Aktualizovat zobrazení počtu žetonů

    // Uložit zprávu do localStorage
    const messages = JSON.parse(localStorage.getItem("message") || "[]");
    messages.push(message);
    localStorage.setItem("message", JSON.stringify(messages));

    messageInput.value = ''; // Vymazat vstup pro zprávu
}

// Funkce pro načtení historie zpráv
function loadMessageHistory() {
    const messages = JSON.parse(localStorage.getItem("message") || "[]");
    const messageContainer = document.getElementById('message-container');
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = msg;
        messageContainer.appendChild(messageElement);
    });
}

// Funkce pro zakoupení žetonů
function buyTokens() {
    const tokenAmount = parseInt(document.getElementById('tokenAmount').value);

    if (tokenAmount < 500 || tokenAmount > 10000) {
        alert("Množství žetonů musí být mezi 500 a 10000.");
        return;
    }

    // Přidání žetonů po úspěšné platbě
    tokenCount += tokenAmount;
    alert(`Zakoupili jste ${tokenAmount} žetonů.`);
    updateTokenDisplay(); // Aktualizace zobrazení žetonů
    document.getElementById('paypalForm').submit(); // Odeslat formulář PayPal
}

// Načíst data při načtení stránky
window.onload = function() {
    displayProfile();
    loadMessageHistory();
};

// Přidání uživatelských dat do localStorage po registraci
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;

    const userData = {
        username: username,
        tokens: tokenCount
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    validateRegistration(event);
});
