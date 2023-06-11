import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Helmet } from 'react-helmet'
import ColumnBody from '../components/dnd/Column/ColumnBody'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import ColumnHeader from '../components/dnd/Column/ColumnHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Dashboard() {
  const [readyToAddColumn, setReadyToAddColumn] = useState(false);
  const [data,setData] = useState({
    title : '',
    color : null
  })
  const [boards, setBoards] = useLocalStorage("_boards",[]);
  const HandleAddNew = (type, payload) => {
    switch (type?.toUpperCase()) {
      case 'COLUMN':
        setBoards([...boards,payload])
        return;
      case "ROW":
        var newBoards = [...boards];
        var itemIndex = newBoards?.findIndex((v) => v?.id == payload?.boardId);
        var item = newBoards[itemIndex]
        item.todos = [...item.todos,{
          id : payload?.id,
          content : payload?.content
        }]
        setBoards([...newBoards])
        return;
      default: return
    }
  }
  const HandleDragDrop = (result) => {
    if (!result.destination) return;
    switch (result?.type) {
      case "COLUMNS":
        var items = Array.from(boards);
        var [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        return setBoards(items);
      case "ROWS":
        var newBoards = Array.from(boards);
        var sourceBoardIndex = newBoards?.findIndex((v) => v.id == result?.source?.droppableId);
        var sourceBoard = newBoards[sourceBoardIndex]
        var todoFromSource = newBoards[sourceBoardIndex]?.todos[result?.source?.index];
        /**-- */
        var destinationBoardIndex = newBoards?.findIndex((v) => v.id == result?.destination?.droppableId);
        var destinationBoard = newBoards[destinationBoardIndex]
        newBoards[destinationBoardIndex].todos = [
          ...destinationBoard?.todos?.slice(0, result?.destination?.index),
          { ...todoFromSource },
          ...destinationBoard?.todos?.slice(result?.destination?.index)
        ]
        var cleanSourceBoardTodos = sourceBoard?.todos?.filter((_, index) => result?.source?.index != index);
        newBoards[sourceBoardIndex].todos = [...cleanSourceBoardTodos]
        return setBoards(newBoards)
      default: return
    }
  }
  return (
    <>
      <Helmet>
        <title>Trello | Dashboard</title>
      </Helmet>
      <div className="w-full h-full px-4">
        <DragDropContext
          onDragEnd={(result) => HandleDragDrop(result)}
        >
          <Droppable
            droppableId='column'
            type='COLUMNS'
            direction='horizontal'
          >
            {
              (provided, snapshot) => (
                <div
                  {...provided?.droppableProps}
                  ref={provided?.innerRef}
                  className='flex justify-start items-start flex-row gap-4 scroll scroll-smooth overflow-x-scroll h-full pt-10'
                >
                  {
                    boards && boards?.map((_v, index) =>
                      <Draggable
                        key={_v.id}
                        draggableId={`${_v.id}`}
                        index={index}
                      >
                        {
                          (_provided, _snapshot) => (
                            <div
                              {..._provided.draggableProps}
                              //{..._provided.dragHandleProps}
                              ref={_provided.innerRef}
                              className={
                                `${_snapshot.isDragging && 'bg-gray-200'} bg-gray-100 flex justify-start items-start flex-col gap-3 max-w-[300px] min-w-[300px] h-fit rounded-md
                                  px-4 py-3 mb-6`
                              }
                            >
                              <ColumnHeader provided={_provided} type={_v?.type} color={_v?.color} count={_v?.todos?.length || 0} />
                              <ColumnBody HandleAddNew={HandleAddNew} column={_v} index={index} />
                            </div>
                          )
                        }
                      </Draggable>
                    )
                  }
                  {provided?.placeholder}
                  <div className='max-w-[300px] min-w-[300px]'>
                    {
                      !readyToAddColumn && (
                        <button onClick={() => setReadyToAddColumn(true)} className='flex justify-start items-center gap-3 text-[#ffff] flex-row w-full h-fit rounded-md bg-[#0092CA] hover:bg-[#007EAF] 
                      px-2 py-1.5'
                        >
                          <AddCircleIcon style={{
                            color: "#FFFF"
                          }} />
                          <span className='capitalize'>add another list</span>
                        </button>
                      )
                    }
                    {readyToAddColumn && (
                      <div className='flex bg-gray-100 flex-col gap-2 w-full rounded-md px-4 py-3'>
                        <TextField
                          required
                          size='small'
                          id='title'
                          label="Title"
                          className='w-full bg-white'
                          type='text'
                          value={data?.title}
                          onChange={(e) => setData({...data,title : e.currentTarget.value})}
                        />
                        <input onChange={(e) => setData({...data,color : e.currentTarget.value})} value={data?.color} type='color' className='w-full rounded-md outline-none border-none ' />
                        <div className='flex flex-row gap-2 justify-start items-center'>
                          <Button 
                            className='capitalize' 
                            type='button' 
                            style={{
                              backgroundColor : "#0092CA"
                            }} 
                            variant="contained" 
                            size="small"
                            onClick={() => {
                              if(!data?.title || !data?.color) return;
                              const payload = {
                                id: uuid(),
                                type: data.title,
                                color: data.color || '#0092CA',
                                todos: []
                              };
                              HandleAddNew("COLUMN",payload);
                              setData({color : null,title : ''});
                              setReadyToAddColumn(false);
                            }}
                          >
                            add list
                          </Button>
                          <button onClick={() => {
                            setData({color : null,title : ''});
                            setReadyToAddColumn(false);
                          }} className='capitalize text-[#DA0037]' type='button'>
                            <ClearIcon style={{
                              fontSize : 26
                            }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}
