import Link from 'next/link';


const About = () => {
  return (
        <div>
            <h1 className='text-lg ml-4 pt-6 pb-2 underline text-center'>About us</h1>
            <p className=' ml-8 mr-8'>Sustainability checker is an easy-to-use hub of information, which shows you information about how sustainable
            companies are. With the large number of international companies, it is hard for an individual to know how sustainable the companies they use are,
            without a large amount of research. This may deter people from making sustainable choices. However, Sustainability Checker provides individuals
            with an easy-to-use list, saving them from the research and allowing them to make more sustainable choices, easier.</p>
            <h1 className='text-lg ml-4 pt-4 pb-2 underline text-center'>How it works</h1>
            <p className='ml-8 mr-8'>Sustainability checker shows you information about how sustainable companies are, through an automatic system.
            We judge how sustainable a company is based on how much of an interest they show in the
            <a href="https://sdgs.un.org/goals" className='underline text-cyan-600'> 17 Sustainable Development Goals </a>
                set by the UN. We judge how interest a company is through evaluating public documents, such as stakeholder reports, and see how many times they reference
            areas following 17 Goals. As this is done through an automatic system, and due to the amount of companies there are in the world, our system
            isn’t entirely accurate, although it does provide a good overview of how seriously a company regards sustainability.  </p>
            <form action="https://sdgs.un.org/goals" >
                <input type="submit" value="United Nations Sustainable Development - 17 Goals" className="shadow-md grid grid-flow-col gap-1 max-w-lg border-2 rounded-lg border-indigo-500/100 hover:bg-sky-100"/>
            </form>
        </div >
  );
};

export default About;
