import React from 'react'

export default function Row({ row,provided,snapshot }) {
  return (
    <>
        <div
            ref={provided?.innerRef}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
            className={`flex justify-start items-start px-2 py-2 bg-white rounded-md shadow w-full h-fit`}
        >
            {row?.content}
        </div>
    </>
  )
}
