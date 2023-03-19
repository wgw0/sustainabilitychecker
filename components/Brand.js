import { useState, useEffect } from 'react';
import { check_percentage } from '../pages';
import Image from 'next/image';
import Card from './Card.js';
import Filter from './Filter.js';

//guidance from https://stackoverflow.com/questions/66235589/nextjs-data-fetching-in-child-component-and-pass-to-parent-component

const Brand = (
  {
    brand, info,
  },
) => {
  const [item, setItem] = useState(info);

  //child component received from filter.js
  const cat = (event, cat_string) => {
    const new_data = check(info, item, event, cat_string);
    setItem(new_data);
  };

  return (
    <>
      <div className="sm:flex sm:px-20 mb-20">
          <div className="bg-slate-200 h-full sm:mt-3 w-full sm:w-85 px-5 border-2 border-indigo-500/100">
            <div className="flex justify-center p-5 pb-0 max-w-sm">
              <div className = "pb-0">
                <Image
                className="rounded-lg"
                src={brand.image}
                alt={brand.name}
                width="100%"
                height="100%"
                contain="fill"
                />
                </div>
                <div className="flex flex-col px-5 pb-0">
                <h1 className='text-4xl text-start font-bold'>{brand.name}</h1>
                <p className="text-left font-bold ">Brand Industry:{brand.industry}</p>
                <div className="w-full flex bg-violet-700 h-5 mb-6 border-solid border-2 border-black cursor-pointer hover:bg-sky-500 active:bg-sky-700 ">
                  <p className="bg-green-400 h-4.5 text-sm text-center font-bold  hover:bg-violet-600 active:bg-violet-700 cursor-pointer" style={{ width: check_percentage({ brand }) }}>{brand.sustainibilities.length}/17</p>
                </div>
                </div>
              </div>
              <h2 className="text-md pb-1 text-left font-bold">Description</h2>
              <p className=' text-left text-sm font-medium'>{brand.description}</p>
              <h2 className="text-md pb-1 pt-1 text-left font-bold">Brand's Sustainable Areas:</h2>
              <p className='ml-1 pt-1 text-left text-sm font-medium'>{brand.sustainibilities.join(';   ')}</p>
              <Filter info = {info} items= {brand.sustainibilities} childToParent={cat}/>
            </div>
            <Card details = {item}/>
        </div>
        </>
  );
};


function check(info, info_array, e, cat_string) {
  const event = e.target.checked;

  const arr = [...info_array];

  for (let i = 0; i < info.length; i++) {
    const val = info[i];
    const cat_array = val.category;

    for (let j = 0; j < cat_array.length; j++) {
      if (cat_array[j] == cat_string && event == false) {
        find_remove(val, arr);
      } else if ((j + 1 == cat_array.length) && event == true) {
        find_remove(val, arr);
        arr.push(val);
      }
    }
  }
  return arr;
}

function find_remove(val, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == val) {
      array.splice(i, 1);
    }
  }
}

export default Brand;
