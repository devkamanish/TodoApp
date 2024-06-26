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
  const [toggleSubmit, settoggleSubmit] = useState(true)
  const [isEditItem, setisEditItem] = useState(null)


  const addItems =()=>{
    if(!inputData){
      alert("please add something")
    }else if(inputData && !toggleSubmit){
      setitems(
        items.map((elem)=>{
          if(elem.id === isEditItem){
            return{...elem,name:inputData}
          }
          return elem;
        })
      )
      settoggleSubmit(true)
      setinputData('')
      setisEditItem(null)
    }
    else{
      const allInputData= {id:new Date().getTime().toString(),name:inputData}
      console.log(allInputData)
      setitems([...items ,allInputData])
      setinputData("")
    }
   
  }

  const handleKeyPress= ()=>{
    if(event.key === "Enter"){
      addItems(event)
    }
  }

  const deleteItem =(ind)=>{
    const updatedItems = items.filter((elem)=>{
      return ind!=elem.id;
    })

    setitems(updatedItems)
  }

  const editItem =(id)=>{
    let newEditItem = items.find((elem)=>{
      return elem.id == id
    })
    console.log(newEditItem)
    settoggleSubmit(false)
    setinputData(newEditItem.name)
    setisEditItem(id)
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
        {
          toggleSubmit ?<i className=" fa fa-plus add-btn" title='Add Item' onClick={addItems}></i> :
          <i className='far fa-edit add-btn' title='Update Item' onClick={()=>addItems}></i>
        }
         </div>

         <div className="showItems">

          {
            items.map((elem ,ind)=>{
              return(
                  
                <div className="eachItem" key={elem.id}>
                <h3>{elem.name}</h3>
                <div className="todo-btn">
                    <i className='far fa-edit add-btn' title='Edit Item' onClick={()=>editItem(elem.id)}></i>
                    <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={()=>deleteItem(elem.id)}></i>
                </div>
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


