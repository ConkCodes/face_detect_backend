import db from "../../index.js";

const getTable = async (tableName) => {
    try {
        // attempt to get table
        if (await db.schema.hasTable(tableName)) return await db(tableName).select("*").limit(5);
        // fail
        return -2;
    // error
    } catch (err) {
        return -1;
    }
}

export default getTable;