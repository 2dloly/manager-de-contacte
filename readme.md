# Documentarea Proiectului: Manager de Contacte

## Descrierea Proiectului

**Manager de Contacte** este o aplicație backend dezvoltată în **Node.js** care oferă funcționalități CRUD (Create, Read, Update, Delete) pentru gestionarea contactelor. Aplicația permite utilizatorilor să adauge, să vizualizeze, să editeze și să șteargă contacte. Datele sunt stocate într-o bază de date **PostgreSQL**, iar interacțiunea cu baza de date este gestionată prin intermediul ORM-ului **Sequelize**.

## Tehnologii Utilizate

- **Node.js**: Platformă JavaScript pentru dezvoltare backend.
- **Express.js**: Framework web minimalist pentru Node.js.
- **PostgreSQL**: Sistem de gestionare a bazelor de date relaționale.
- **Sequelize**: ORM (Object-Relational Mapping) pentru interacțiunea cu baza de date.
- **Express Validator**: Bibliotecă pentru validarea și sanitizarea datelor.
- **Body-parser**: Middleware pentru parsarea corpului cererilor HTTP.
- **Cors**: Middleware pentru gestionarea politicilor CORS.
- **Nodemon**: Tool pentru dezvoltare care repornește automat serverul la detectarea modificărilor în cod.

## Structura Codului

```
manager-de-contacte/
│
├── app.js
├── config/
│   └── database.js
├── controllers/
│   └── contactController.js
├── models/
│   └── contact.js
├── routes/
│   └── contacts.js
├── package.json
└── README.md
```

- **app.js**: Punctul de intrare al aplicației; configurează serverul și middleware-urile.
- **config/database.js**: Configurarea conexiunii la baza de date PostgreSQL.
- **controllers/contactController.js**: Conține funcțiile care gestionează logica aplicației pentru fiecare rută.
- **models/contact.js**: Definirea modelului `Contact` utilizând Sequelize.
- **routes/contacts.js**: Definirea rutelor API pentru operațiunile CRUD.
- **package.json**: Fișierul de configurare npm care listează dependențele proiectului.

## API REST: Rutele Disponibile (Endpoints)

Aplicația implementează un API RESTful cu următoarele rute:

### 1. Crearea unui nou contact

- **Metodă HTTP**: `POST`
- **URL**: `/contacts/`
- **Descriere**: Creează un nou contact în baza de date.
- **Date așteptate în corpul cererii (JSON)**:

  ```json
  {
    "name": "Nume Prenume",
    "phone": "Număr de telefon",
    "email": "email@example.com",   // opțional
    "note": "Notă suplimentară"     // opțional
  }
  ```

- **Răspunsuri posibile**:
    - **201 Created**: Contactul a fost creat cu succes; returnează datele noului contact.
    - **400 Bad Request**: Datele de intrare nu sunt valide; returnează detalii despre erori.
    - **500 Internal Server Error**: Eroare la nivel de server.

### 2. Afișarea tuturor contactelor

- **Metodă HTTP**: `GET`
- **URL**: `/contacts/`
- **Descriere**: Returnează o listă cu toate contactele din baza de date.
- **Răspunsuri posibile**:
    - **200 OK**: Returnează un array de contacte.
    - **500 Internal Server Error**: Eroare la nivel de server.

### 3. Afișarea unui contact după ID

- **Metodă HTTP**: `GET`
- **URL**: `/contacts/:id`
- **Descriere**: Returnează detaliile contactului cu ID-ul specificat.
- **Parametri URL**:
    - `id` (obligatoriu): ID-ul numeric al contactului.
- **Răspunsuri posibile**:
    - **200 OK**: Returnează datele contactului.
    - **404 Not Found**: Contactul nu a fost găsit.
    - **500 Internal Server Error**: Eroare la nivel de server.

### 4. Actualizarea unui contact

- **Metodă HTTP**: `PUT`
- **URL**: `/contacts/:id`
- **Descriere**: Actualizează datele contactului cu ID-ul specificat.
- **Parametri URL**:
    - `id` (obligatoriu): ID-ul numeric al contactului.
- **Date așteptate în corpul cererii (JSON)**:

  ```json
  {
    "name": "Nume Actualizat",
    "phone": "Număr de telefon actualizat",
    "email": "email_actualizat@example.com",  // opțional
    "note": "Notă actualizată"                // opțional
  }
  ```

- **Răspunsuri posibile**:
    - **200 OK**: Contactul a fost actualizat cu succes; returnează datele actualizate.
    - **400 Bad Request**: Datele de intrare nu sunt valide; returnează detalii despre erori.
    - **404 Not Found**: Contactul nu a fost găsit.
    - **500 Internal Server Error**: Eroare la nivel de server.

### 5. Ștergerea unui contact

- **Metodă HTTP**: `DELETE`
- **URL**: `/contacts/:id`
- **Descriere**: Șterge contactul cu ID-ul specificat din baza de date.
- **Parametri URL**:
    - `id` (obligatoriu): ID-ul numeric al contactului.
- **Răspunsuri posibile**:
    - **200 OK**: Contactul a fost șters cu succes; returnează un mesaj de confirmare.
    - **404 Not Found**: Contactul nu a fost găsit.
    - **500 Internal Server Error**: Eroare la nivel de server.

## Validarea Datelor și Gestionarea Erorilor

### Validarea Datelor

Aplicația utilizează **Express Validator** pentru a valida și sanitiza datele de intrare. Validarea este realizată în rutele `POST` și `PUT` pentru a asigura integritatea datelor.

- **Câmpuri obligatorii**:
    - `name`: Trebuie să fie un șir de caractere nevidat.
    - `phone`: Trebuie să fie un șir de caractere nevidat.
- **Câmpuri opționale**:
    - `email`: Dacă este furnizat, trebuie să fie o adresă de email validă.
    - `note`: Text opțional; fără restricții speciale.

**Exemplu de validare în rută**:

```javascript
const { body } = require('express-validator');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Numele este obligatoriu'),
    body('phone').notEmpty().withMessage('Numărul de telefon este obligatoriu'),
    body('email').optional().isEmail().withMessage('Adresa de email nu este validă'),
  ],
  contactController.createContact
);
```

### Gestionarea Erorilor

Erorile sunt gestionate atât la nivel de validare a datelor de intrare, cât și la nivel de operațiuni cu baza de date.

- **Erori de validare**:
    - Dacă datele de intrare nu trec de validare, aplicația returnează un răspuns cu codul **400 Bad Request** și o listă detaliată a erororilor.

  **Exemplu de răspuns la eroare de validare**:

  ```json
  {
    "errors": [
      {
        "msg": "Numele este obligatoriu",
        "param": "name",
        "location": "body"
      },
      {
        "msg": "Numărul de telefon este obligatoriu",
        "param": "phone",
        "location": "body"
      }
    ]
  }
  ```

- **Erori legate de baza de date**:
    - Dacă apare o eroare în timpul interacțiunii cu baza de date (de exemplu, conexiunea a eșuat), aplicația returnează un răspuns cu codul **500 Internal Server Error** și un mesaj de eroare generic.

- **Erori 404 Not Found**:
    - Dacă un contact nu este găsit pentru operațiuni care necesită un ID existent (GET, PUT, DELETE `/contacts/:id`), aplicația returnează un răspuns cu codul **404 Not Found** și un mesaj informativ.

**Gestionarea erorilor în controller**:

```javascript
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contactul nu a fost găsit' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la preluarea datelor' });
  }
};
```

## Metode Utilizate pentru Validare și Gestionarea Erorilor

- **Express Validator**:
    - Validarea câmpurilor de intrare în rutele `POST` și `PUT`.
    - Generarea mesajelor de eroare specifice pentru fiecare câmp invalid.

- **Try-Catch**:
    - Gestionarea excepțiilor în operațiunile asincrone cu `async/await`.
    - Returnarea răspunsurilor cu codurile de stare HTTP adecvate în caz de erori.

- **Răspunsuri Structurate**:
    - Mesaje de eroare consistente și ușor de interpretat de către client.
    - Utilizarea codurilor de stare HTTP corespunzătoare pentru fiecare tip de eroare.

