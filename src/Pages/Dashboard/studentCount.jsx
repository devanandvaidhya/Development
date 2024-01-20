import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function StudentCount()
{
    return(
        <>
       

        <div  className='sdnt-bar m-4'>
        Student Counts:
        <BarChart 
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['2020', '2021', '2022', '2023'], scaleType: 'band' }]}
      
    />

    
    </div>
        </>
    )
}