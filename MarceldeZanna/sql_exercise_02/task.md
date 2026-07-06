Recipe {
    id: UUID                        //primaryKey
    name: string
    description: string
    manual: string                  // ** weitere Tabelle -ausgelassen- **
    creator: creator                // 1 : 1 //foreignKey
    reviewId: review.id             // 1 : M //foreignKey
}

Ingredient {
    id: UUID                        //primaryKey
    name: string
    amount: float
    unit: string
    recipeId: recipe.id             // 1 : M //foreignKey
}

Review {
    id: UUID                        //primaryKey
    text: string
    rating: number                  //** 5-Star-Rating **
    userId: user.id                 // 1 : 1 //foreignKey       
    dateOfRating: new Date
    recipeId: recipe.id.            // 1 : 1 //foreignKey
}

Creator {
    id: UUID                        //primaryKey
    userId: user.id                 // 1 : 1 //foreignKey
}

User {
    id: UUID                        //primaryKey
    firstname: string
    lastname: string
    username: string
    password: OAuth                 //** OAuth???? **
    adress: adress                  // 1 : 1 //foreignKey
}

Adress {
    id: UUID                        //primaryKey
    country: string
    zipcode: string                 //** da nicht in jedem land nur zahlen**
    street: string
    no: string
    state?: string
}

1 & 2 & 3. siehe oben in Form von PseudoObjekten dargestellt incl Kommentare
