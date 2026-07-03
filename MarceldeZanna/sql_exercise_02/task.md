Receipe {
    id: UUID                    //primaryKey
    name: string
    description: string
    manual: string              // ** weitere Tabelle -ausgelassen- **
    creator: creator            // 1 : 1 //foreignKey
    incredients: incredient     // Many : 1 //foreignKey
    reviews: review             // Many : 1 //foreignKey
}

Incredient {
    id: UUID                    //primaryKey
    name: string
    amount: float
    unit: string
}

Review {
    id: UUID                    //primaryKey
    text: string
    rating: number              //** 5-Star-Rating **
    user: user                  // Many : 1 //foreignKey       
    dateOfRating: new Date
}

Creator {
    id: UUID                    //primaryKey
    user: user                  // 1 : 1 //foreignKey
}

User {
    id: UUID                    //primaryKey
    firstname: string
    lastname: string
    username: string
    password: OAuth             //** OAuth???? **
    adress: adress              // 1 : 1 //foreignKey
}

Adress {
    id: UUID                    //primaryKey
    country: string
    zipcode: string             //** da nicht in jedem land nur zahlen**
    street: string
    no: string
    state?: string
}

1 & 2 & 3. siehe oben in Form von PseudoObjekten dargestellt incl Kommentare
