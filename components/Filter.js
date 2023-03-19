import React from 'react';


const Filter = ({items,childToParent}) => {
    return (
        <div className = "py-24" pt-1 pb-1 my-1>
          {items?.map((val,id) => {
            return (
              <div className='flex flex-col' key={id}>
                <div className="form-check">
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" defaultChecked  value={val} type="checkbox" id="flexCheckDefault" onChange={(e) => childToParent(e,val)}/>
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                    {val}
                  </label>
                </div>
            </div>
            )
          })}
        </div>
  );
}

//on click passes val to parent component



export default Filter;
