User {
    id: UUID                        //PrimaryKey
    nickName: string
    firstName: string
    lastName: string
    email: string
    birthDate: date
    gender: gender.id               //ForeignKey 1 : 1  
    //** ich spare hier jetzt mal persönliche daten und PW aus **//
}

Post {
    id: UUID                        //PrimaryKey
    text: string
    picture: string
    date: newDate
    comments: [comment.id]          //foreignKeys[] // 1 : M
    user: user.id                   //foreignKey // 1 : 1
}

Comment {
    id: UUID                        //PrimaryKey
    user: user.id                   //foreignKey // 1 : 1
    text: string
    date: newDate
}

FriendRequest {
    id: UUID                        //PrimaryKey
    requstDate: newDate
    status: status.id                  //foreignKeys (wie bei user: user.id)
    user: user.id                   //foreignKeys 
                                    // M : 1 wenn Absender // M : 1 wenn Empfänger
}

Gender {
    id: UUID                        //PrimaryKey
    name: string
}

Status {
    id: UUID                        //PrimaryKey
    name: string
}

UserProfile können über USER nach CRUD genutzt werden

Freundschaftsanfragen, wird genutzt um Anfragen anzunehmen oder zu versenden

Beiträge / Kommentare: 
    - Beiträge werden über POST gesetzt bzw vom jeweiligen USER bearbeitet
    - Kommentare können beliebig von USER(N) hinzugefügt oder selbst editiert werden.