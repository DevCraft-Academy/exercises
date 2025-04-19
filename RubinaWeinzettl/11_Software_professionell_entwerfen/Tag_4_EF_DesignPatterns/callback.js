//function getUser(id, callback) {
//  setTimeout(() => {
//    console.log("User aus der Datenbank abgerufen");
//    callback({ id: id, username: "MaxMustermann" });
//  }, 1000);
//}
//
//function getPermissions(user, callback) {
//  setTimeout(() => {
//    console.log(`Berechtigungen für ${user.username} abgerufen`);
//    callback(['admin', 'editor']);
//  }, 1000);
//}
//
//function getArticles(permissions, callback) {
//  setTimeout(() => {
//    console.log(`Artikel basierend auf Berechtigungen ${permissions.join(", ")} abgerufen`);
//    callback(["Artikel 1", "Artikel 2"]);
//  }, 1000);
//}
//
//// Verwendung der Funktionen mit Callbacks
//getUser(1, (user) => {
//  getPermissions(user, (permissions) => {
//    getArticles(permissions, (articles) => {
//      console.log(articles);
//    });
//  });
//});

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Userdaten erfolgreich abgerufen");
      resolve({ id: id, username: "MaxMustermann" });
    }, 1000);
  });
}


function handleFetchedData(data) {
  data
    .then((result) => {
      console.log(result); // „Daten erfolgreich abgerufen”
    })
    .catch((error) => {
      console.error(error); // Fehlerbehandlung, falls vorhanden
    });
}

// Aufruf der asynchronen Funktion, die ein Promise zurückgibt
const fetchedData = fetchData();
handleFetchedData(fetchedData);


