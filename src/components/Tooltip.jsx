import React from 'react'

export default function Tooltip(props) {
    {/*const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />))
        (({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: '#FFFFFF',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#222831",
        },
    }));
return CustomTooltip;*/}
    return (<Tooltip {...props} componentsProps={{
        tooltip: {
            sx: {
                bgcolor: 'common.black',
                '& .MuiTooltip-arrow': {
                    color: 'common.black',
                },
            },
        },
    }} />)
}
