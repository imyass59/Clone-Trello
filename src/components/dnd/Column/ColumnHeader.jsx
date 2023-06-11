import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { lightenHexColor } from '../../../utils/ColorLight';

export default function ColumnHeader({ provided, type, count,color }) {
    
    return (
        <>
            <div
                {...provided.dragHandleProps}
                className='w-full h-fit flex flex-row justify-between items-center gap-4'
            >
                <DragIndicatorIcon style={{
                    color: "rgb(156 163 175)"
                }} />
                <span style={{
                    color : `${color}` ,
                    backgroundColor : `${lightenHexColor(color,80)}`
                }} className={`capitalize text-sm font-medium px-2.5 py-0.5 rounded`}>
                    {type}
                </span>
                <span className='bg-gray-200 text-gray-400 px-2 py-1.2 rounded-full'>
                    {count}
                </span>
            </div>
        </>
    )
}
