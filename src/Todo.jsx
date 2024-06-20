import React, { useEffect } from 'react'
import todo from './images/todo.jpg'
import { useState } from 'react'

// to get the data from localstorge
const getLocalItems = ()=>{
  let list = localStorage.getItem('lists')
  console.log(list)

  if(list){
    return JSON.parse(localStorage.getItem("lists"))
  }else{
    return [];
  }
}
const Todo = () => {

  const [inputData, setinputData] = useState("")
  const [items, setitems] = useState(getLocalItems())


  const addItems =()=>{
    if(!inputData){

    }else{
      setitems([...items ,inputData])
      setinputData("")
    }
   
  }

  const handleKeyPress= ()=>{
    if(event.key === "Enter"){
      addItems(event)
    }
  }

  const deleteItem =(id)=>{
    console.log(id)
    const updatedItems = items.filter((elem,ind)=>{
      return ind!=id;
    })

    setitems(updatedItems)
  }

  const removeAll = ()=>{
      setitems([])
  }

  //add data to local storage
  useEffect(()=>{
    localStorage.setItem("lists",JSON.stringify(items))
  },[items]);

  return (
  <>
<div className="main-div">
      <div className="child-div">
      <figure>
        <img src={todo} alt="todologo " />
        <figcaption>Add your list here ✌️</figcaption>
      </figure>
      <div className="addItems">
        <input type='text' placeholder= '✍️ Add Items...' id=''
        value={inputData}
        onChange={(e)=>setinputData(e.target.value)}
        onKeyPress={handleKeyPress}
        />
        <i className=" fa fa-plus add-btn" title='Add Item' onClick={addItems}></i>  
         </div>

         <div className="showItems">

          {
            items.map((elem ,ind)=>{
              return(
                  
                <div className="eachItem" key={ind}>
                <h3>{elem}</h3>
                <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={()=>deleteItem(ind)}></i>
                </div>
              )
            })
          }
         </div>

         <div className="showItems">
            <button className='btn effect04' data-sm-link-text = "Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
         </div>
      </div>
    </div>
  </>
  )
}

export default Todo


