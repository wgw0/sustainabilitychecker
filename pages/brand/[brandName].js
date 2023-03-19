import Brand from '../../components/Brand';
import { connectToDatabase } from "../../util/mongodb";


function Page ({basic_information,scraped_information})  {
    console.log(basic_information,scraped_information)
    return (
        <Brand brand = {basic_information} info = {scraped_information}/>
    )
}

export function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps(context) {
    const q = context.params;

    const { db } = await connectToDatabase();

    const basic_information = await db.collection("coBox").findOne({ urlname : q.brandName});
    const scraped_information = await db.collection("codata").find({company : q.brandName}).limit(50).toArray();
    return {
        props: {
            basic_information: JSON.parse(JSON.stringify(basic_information)),
            scraped_information: JSON.parse(JSON.stringify(scraped_information)),
        },
    };
}

export default Page;