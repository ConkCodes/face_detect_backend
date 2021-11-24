import db from "../../index.js";

const getTable = async (tableName) => {
    try {
        const exists = await db.schema.hasTable(tableName);
        if (exists) return await db(tableName).select("*").limit(5);
        return -2;
    } catch (err) {
        return -1;
    }
}

export default getTable;