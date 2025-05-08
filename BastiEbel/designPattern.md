// Funktion getUser mit Promise
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User aus der Datenbank abgerufen");
      resolve({ id: id, username: "MaxMustermann" });
    }, 1000);
  });
}

// Funktion getPermissions mit Promise
function getPermissions(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Berechtigungen für ${user.username} abgerufen`);
      resolve(["admin", "editor"]);
    }, 1000);
  });
}

// Funktion getArticles mit Promise
function getArticles(permissions) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        `Artikel basierend auf Berechtigungen ${permissions.join(", ")} abgerufen`
      );
      resolve(["Artikel 1", "Artikel 2"]);
    }, 1000);
  });
}

// Verwendung mit async/await
async function fetchUserData() {
  try {
    const user = await getUser(1); // User abrufen
    const permissions = await getPermissions(user); // Berechtigungen abrufen
    const articles = await getArticles(permissions); // Artikel abrufen
    console.log(articles); // Ergebnis ausgeben
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

// Funktion aufrufen
fetchUserData();
