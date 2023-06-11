import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Row from '../Row/Row'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuid } from 'uuid';
import { Button, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function ColumnBody({ column, index,HandleAddNew }) {
  const [readyToAddRow, setReadyToAddRow] = useState(false);
  const [content, setContent] = useState('');
  return (
    <>
      <div
        className='w-full max-h-[80%]'
      >
        <Droppable
          droppableId={`${column?.id}`}
          type='ROWS'
          direction='vertical'
        >
          {
            (provided, snapshot) => (
              <div
                {...provided?.droppableProps}
                ref={provided?.innerRef}
                className='flex justify-center items-center gap-2 flex-col'
              >
                {
                  column?.todos && column?.todos?.map((_v, index) => (
                    <Draggable
                      key={_v?.id?.toString()}
                      draggableId={`${_v?.id?.toString()}`}
                      index={index}
                    >
                      {
                        (_provided, _snapshot) => (
                          <Row row={_v} provided={_provided} snapshot={_snapshot} />
                        )
                      }
                    </Draggable>
                  ))
                }
                {provided.placeholder}
                <div className='w-full h-fit'>
                  {
                    !readyToAddRow && (
                      <button
                      onClick={() => setReadyToAddRow(true)}
                        style={{
                          /*backgroundColor : 'rgb(156 163 175)'*/
                        }}
                        className='flex justify-start items-center gap-3 px-2 py-2 rounded-md hover:shadow w-full h-fit hover:bg-gray-200'
                      >
                        <AddCircleIcon style={{
                          color: 'rgb(156 163 175)',
                          fontSize: 22
                        }} />
                        <span style={{ color: "rgb(156 163 175)" }} className='font-medium text-sm capitalize'>add a card</span>
                      </button>
                    )
                  }
                  {
                    readyToAddRow && (
                      <div className='flex bg-gray-100 flex-col gap-2 w-full rounded-md'>
                        <TextField
                          required
                          size='small'
                          id='content'
                          label="Content"
                          className='w-full bg-white'
                          type='text'
                          value={content}
                          onChange={(e) => setContent(e.currentTarget.value)}
                        />
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
                              if(!content) return;
                              const payload = {
                                id: uuid(),
                                content : content,
                                boardId : column?.id
                              };
                              HandleAddNew("ROW",payload);
                              setContent('');
                              setReadyToAddRow(false);
                            }}
                          >
                            add card
                          </Button>
                          <button onClick={() => {
                            setContent('');
                            setReadyToAddRow(false);
                          }} className='capitalize text-[#DA0037]' type='button'>
                            <ClearIcon style={{
                              fontSize : 26
                            }} />
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
        </Droppable>
      </div>
    </>
  )
}
