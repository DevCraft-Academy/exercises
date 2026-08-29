//  Beispiel für Callback-Hell und dessen Umwandlung in Promises und async/await
// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("User aus der Datenbank abgerufen");
//     callback({ id: id, username: "MaxMustermann" });
//   }, 1000);
// }

// function getPermissions(user, callback) {
//   setTimeout(() => {
//     console.log(`Berechtigungen für ${user.username} abgerufen`);
//     callback(['admin', 'editor']);
//   }, 1000);
// }

// function getArticles(permissions, callback) {
//   setTimeout(() => {
//     console.log(`Artikel basierend auf Berechtigungen ${permissions.join(", ")} abgerufen`);
//     callback(["Artikel 1", "Artikel 2"]);
//   }, 1000);
// }

// // Verwendung der Funktionen mit Callbacks
// getUser(1, (user) => {
//   getPermissions(user, (permissions) => {
//     getArticles(permissions, (articles) => {
//       console.log(articles);
//     });
//   });
// });

// Umwandlung in Promises
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
// Verwendung der Funktionen mit Promises
getUser(1)
  .then(user => getPermissions(user))
  .then(permissions => getArticles(permissions))
  .then(articles => console.log(articles));

// Verwendung der Funktionen mit async/await
async function fetchArticles() {
const user = await getUser(1)
const permissions = await getPermissions(user)
const articles = await getArticles(permissions)
console.log(articles);
}