import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {

    const brand_name = req.query.brandName;

    const { db } = await connectToDatabase();

    const basic_information = await db.collection("coBox").findOne({ urlname : brand_name});
    const scraped_information = await db.collection("codata").find({company : brand_name}).limit(50).toArray();

    const data = {
        base_info: JSON.parse(JSON.stringify(basic_information)),
        found_info: JSON.parse(JSON.stringify(scraped_information))
    }

    res.json(data);
}
