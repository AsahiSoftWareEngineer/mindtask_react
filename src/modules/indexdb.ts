export class DatabaseManager{

    public database:any;
    public openRequest:any;
    public transaction:any;

    constructor(dbName:string){
        this.openRequest = window.indexedDB.open(dbName)
        this.openRequest.onsuccess = () => {
            this.database = this.openRequest.result;
        }
    }

    createTable = async (tableName:string, keyPathName:string, permission:"readwrite"|"readonly", model:{key:string, unique:boolean}[]) => {
        const upgradedDB = await this.openRequest.onupgradeneeded();
        this.database = upgradedDB.target.result;
        const store = await this.database.createObjectStore(tableName, { keyPath: keyPathName });
        model.forEach((item) => {
            store.createIndex(item.key, item.key, {unique: item.unique});
        })
        this.transaction = await this.database.transaction([tableName], permission);
    }

    insert = async (tableName: string, params: []) => {
        const store = await this.transaction.objectStore(tableName);
        params.forEach((item) => {
            store.add(item);
        })
    }

    get = async (tableName: string, key: string) => {
        const transaction = await this.database.objectStore([tableName]);
        const store = await transaction.objectStore(tableName);
        const request = await store.get(key);
        return await request.onsuccess();
    }
}