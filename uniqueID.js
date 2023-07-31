function uniqueID () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    const length = 16;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        state += chars.charAt(randomIndex);
    }

    return state;
}

const state = uniqueID();

module.exports ={
    uniqueID
}