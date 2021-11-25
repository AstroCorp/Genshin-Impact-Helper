const getEvents = () => {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/timeline.js')
        .then(res => res.text())
        .then(res => {
            console.log(res)
            resolve(null);
        })
        .catch(err => reject(err));
    });
}

export default getEvents;
