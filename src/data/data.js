const DataHelpers = {
    generateUsers() {
        const userNames = [
            'Phil Khaisman',
            'Mike Wadsley',
            'Vince Romet',
            'Eli Studer',
            'Max Blauer',
            'Rory Coughlin',
            'Andrew Izzo',
            'Amy Borch',
            'Thao Lai',
            'Anna Khaisman',
            'Elena Drozdova',
            'Helen Prentice',
            'Alex Cardamon',
            'Nicole Salnikov',
            'Liz Cooper',
        ]

        // is there a more efficient way to do this? ie not nested loops
        const userCards = userNames.map(userName => {
            const cardsToSwipe = userNames
                .map(userName => {
                    return userNames.indexOf(userName)
                })
                .filter(id => id !== userNames.indexOf(userName))

            return {
                id: userNames.indexOf(userName),
                firstName: userName.split(' ')[0],
                lastName: userName.split(' ')[1], 
                email: `${userName.split(' ')[0]}@gmail.com`,
                age: 26,
                bio: 'Lorem ipsum',
                location: '',
                cardsToSwipe,
                usersLiked: [],
                usersMatched: [0, 1],               
            }
        })

        return userCards
    },
}

export default DataHelpers

