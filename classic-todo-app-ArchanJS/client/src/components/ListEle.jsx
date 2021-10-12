import React from 'react';
import { MdDelete } from 'react-icons/md';

const ListEle = ({content,id,deleteEle}) => {
    return (
        <li className="todo-li d-flex flex-row w-75 mt-4 ms-5 align-items-center justify-content-center">
            <div className="border border-info p-2 px-4">{content}</div>
            <button className="btn btn-dark"
            onClick={()=>{
                deleteEle(id);
            }}
            ><MdDelete /></button>
        </li>

    )
}

export default ListEle;
