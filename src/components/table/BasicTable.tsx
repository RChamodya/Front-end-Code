import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useState} from "react";
import {Icon} from "@mui/material";

interface BasicTableProps{
  columnHeaders:Array<string>;
  tableData:Array<any>;
  actionButtons:Array<any>;
  id:any;
}

function BasicTable({columnHeaders,tableData,actionButtons,id}:BasicTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow>
            {columnHeaders.map((m:string, index:number)=><TableCell key={index}>{m}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>

          {tableData.map((row,index)=>(<TableRow key={index}>
            {Object.entries(row).map(([key,value],index2)=><TableCell  key={index2}><>{value}</></TableCell>)}
            {actionButtons.map((b:any, index3:number)=><TableCell key={index3}>{<Icon onClick={()=>{
              return b.action(row[id])
            }}>{b.icon}</Icon>}</TableCell>)}

          </TableRow>))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable;