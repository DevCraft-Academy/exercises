// Refaktorierte Funktionen mit Promises
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User aus der Datenbank abgerufen");
      resolve({ id: id, username: "MaxMustermann" });
    }, 1000);
  });
}

function getPermissions(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Berechtigungen für ${user.username} abgerufen`);
      resolve(['admin', 'editor']);
    }, 1000);
  });
}

function getArticles(permissions) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Artikel basierend auf Berechtigungen ${permissions.join(", ")} abgerufen`);
      resolve(["Artikel 1", "Artikel 2"]);
    }, 1000);
  });
}

// Verwendung mit async/await - saubere, lineare Struktur
async function fetchUserData() {
  try {
    const user = await getUser(1);
    const permissions = await getPermissions(user);
    const articles = await getArticles(permissions);
    console.log(articles);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

// Ausführung
fetchUserData();

// Alternative: Direkte Verwendung mit async/await in einer IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    const user = await getUser(1);
    const permissions = await getPermissions(user);
    const articles = await getArticles(permissions);
    console.log('Direkte Ausführung:', articles);
  } catch (error) {
    console.error('Fehler:', error);
  }
})();