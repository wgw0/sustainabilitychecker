import Image from 'next/image';
import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';


//https://www.codegrepper.com/code-examples/javascript/how+to+map+through+an+array+of+objects+in+nextjs

export default function Home({ brands, brand_data }) {
  return (
    <div >
      {brands.map((brand, index) => (
        <Link href={'/brand/[brandName]'} as={`/brand/${brand.urlname}`} key={index} >
          <div className="mx-5 my-5 shadow-md grid grid-flow-col gap-1 max-w-xl h-full border-2 rounded-lg border-indigo-500/100 " >
            <div className="m-2 relative row-span-3 border-r-1 rounded-sm  border-indigo-500/75">
              <Image
                className="rounded-lg"
                src={brand.image}
                alt={brand.name}
                width="100%"
                height="100%"
                contain="fill"
            />
            <div/>
          </div>
        <div className="row-span-1 w-full h-4">
          <div className="bg-green-500 h-full cursor-pointer hover:bg-sky-500 active:bg-sky-700" style={{ width: check_percentage({ brand }) }}></div>
      </div>
      <div className="row-span-2 text-xs"><p className="font-bold">Description:</p>{brand.description}</div>
      </div>
      </Link>
      ))}
    </div>
  );
}

// returns a percentage from the company.box array of sustainabilities.
// NOTE - These sustainabilities were pushed from ./scraper/companyScraper Module along with the texts
export function check_percentage({ brand }) {
  const sustainibilities = brand.sustainibilities;
  const goal = 17;

  return ((sustainibilities.length / goal) * 100).toString() + '%';
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const brands = await db.collection('coBox').find({}).limit(50).toArray();
  // const brand_data = await db.collection("codata").find({}).limit(50).toArray();
  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands)),
      // brand_data: JSON.parse(JSON.stringify(brand_data)),
    },
  };
}
