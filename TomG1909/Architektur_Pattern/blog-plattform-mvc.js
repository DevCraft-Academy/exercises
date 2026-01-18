
class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

class Article {
    constructor(id, title, content, authorId, date = new Date()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.date = date;
        this.comments = [];
    }
}

class Comment {
    constructor(id, content, authorId, articleId, date = new Date()) {
        this.id = id;
        this.content = content;
        this.authorId = authorId;
        this.articleId = articleId;
        this.date = date;
    }
}

// Daten-Storage (simuliert eine Datenbank)
class BlogModel {
    constructor() {
        this.users = [];
        this.articles = [];
        this.comments = [];
        this.nextUserId = 1;
        this.nextArticleId = 1;
        this.nextCommentId = 1;
    }

    // User-Management
    createUser(username, email) {
        const user = new User(this.nextUserId++, username, email);
        this.users.push(user);
        return user;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    // Artikel-Management
    createArticle(title, content, authorId) {
        const article = new Article(this.nextArticleId++, title, content, authorId);
        this.articles.push(article);
        return article;
    }

    getAllArticles() {
        return this.articles;
    }

    getArticleById(id) {
        return this.articles.find(article => article.id === id);
    }

    // Kommentar-Management
    createComment(content, authorId, articleId) {
        const comment = new Comment(this.nextCommentId++, content, authorId, articleId);
        this.comments.push(comment);
        
        // Kommentar zum Artikel hinzufügen
        const article = this.getArticleById(articleId);
        if (article) {
            article.comments.push(comment);
        }
        return comment;
    }

    getCommentsByArticleId(articleId) {
        return this.comments.filter(comment => comment.articleId === articleId);
    }
}

// ============= VIEW (Benutzeroberfläche) =============

class BlogView {
    // Artikel-Liste anzeigen
    renderArticleList(articles, users) {
        console.log('\n=== BLOG ARTIKEL ===');
        articles.forEach(article => {
            const author = users.find(user => user.id === article.authorId);
            console.log(`\n ${article.title}`);
            console.log(`   Von: ${author?.username || 'Unbekannt'}`);
            console.log(`   Datum: ${article.date.toLocaleDateString()}`);
            console.log(`   Kommentare: ${article.comments.length}`);
        });
    }

    // Einzelnen Artikel anzeigen
    renderArticle(article, author, comments, users) {
        console.log('\n' + '='.repeat(50));
        console.log(`${article.title}`);
        console.log(`Autor: ${author?.username || 'Unbekannt'}`);
        console.log(`Datum: ${article.date.toLocaleDateString()}`);
        console.log('-'.repeat(30));
        console.log(article.content);
        
        if (comments.length > 0) {
            console.log('\ KOMMENTARE:');
            comments.forEach(comment => {
                const commentAuthor = users.find(user => user.id === comment.authorId);
                console.log(`\n  ${commentAuthor?.username || 'Anonym'}: ${comment.content}`);
                console.log(`  ${comment.date.toLocaleString()}`);
            });
        }
        console.log('='.repeat(50));
    }

    // Eingabeformular simulieren
    showCreateArticleForm() {
        console.log('\n NEUEN ARTIKEL ERSTELLEN');
        console.log('Titel: [Eingabefeld]');
        console.log('Inhalt: [Textfeld]');
        console.log('[Speichern] [Abbrechen]');
    }

    showCreateCommentForm() {
        console.log('\n KOMMENTAR HINZUFÜGEN');
        console.log('Kommentar: [Textfeld]');
        console.log('[Kommentar posten]');
    }
}

// ============= CONTROLLER (Geschäftslogik) =============

class BlogController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentUser = null;
    }

    // User-Authentifizierung (vereinfacht)
    login(username) {
        this.currentUser = this.model.users.find(user => user.username === username);
        if (!this.currentUser) {
            console.log(`User '${username}' nicht gefunden`);
            return false;
        }
        console.log(`Eingeloggt als ${username}`);
        return true;
    }

    // Alle Artikel anzeigen
    showAllArticles() {
        const articles = this.model.getAllArticles();
        this.view.renderArticleList(articles, this.model.users);
    }

    // Einzelnen Artikel anzeigen
    showArticle(articleId) {
        const article = this.model.getArticleById(articleId);
        if (!article) {
            console.log('Artikel nicht gefunden');
            return;
        }

        const author = this.model.getUserById(article.authorId);
        const comments = this.model.getCommentsByArticleId(articleId);
        this.view.renderArticle(article, author, comments, this.model.users);
    }

    // Neuen Artikel erstellen
    createArticle(title, content) {
        if (!this.currentUser) {
            console.log('Bitte erst einloggen!');
            return;
        }

        const article = this.model.createArticle(title, content, this.currentUser.id);
        console.log(`Artikel "${title}" wurde erstellt!`);
        return article;
    }

    // Kommentar hinzufügen
    addComment(articleId, content) {
        if (!this.currentUser) {
            console.log('Bitte erst einloggen!');
            return;
        }

        const comment = this.model.createComment(content, this.currentUser.id, articleId);
        console.log('Kommentar wurde hinzugefügt!');
        return comment;
    }
}

