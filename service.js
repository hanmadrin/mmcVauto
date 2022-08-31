class ChromeStorage{
    constructor(name){
        if(typeof name!=='string') throw new Error ('unknown value for autoIncrement');
        this.name = name;
    }
    async GET() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(this.name, (result) => { resolve(result[this.name]); }); 
        }); 
    }
    async SET(db) {
        return new Promise((resolve, reject) => {
            const obj = {};
            obj[this.name]=db;
            chrome.storage.local.set(obj, function() {resolve(db)});
        });
    }
}
const mondayItemDB = new ChromeStorage('mondayItem');
const mondayItemVinDB = new ChromeStorage('mondayItemVins');
(async () => {
    const db = await mondayItemDB.GET();
    console.log(db);
    await mondayItemDB.SET(null);
    await mondayItemVinDB.SET([]);
    const db2 = await mondayItemDB.GET();
    console.log(db2);
})();