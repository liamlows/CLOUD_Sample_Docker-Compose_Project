import {ClassTable} from "./classTable";
export const classMenu = () => {

    /**interface Column {
    id: 'Class' | 'ID' | 'Professor' | 'Days' | 'Time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
const rows = [
    //Insert Data
];
     * 
     */
    //minWidth 170, 100?
const columns = [
    { id: 'Class', label: 'Class', minWidth: 170 },
    { id: 'ID', label: 'ID', minWidth: 100 },
    {
      id: 'Professor',
      label: 'Professor',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'Days',
      label: 'Days',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'Time',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  const rows = [
    //TODO: Insert Data
];

    //TODO: put nav bar in, data intergration
    return <div>
        
        <ClassTable rows = {rows} columns = {columns}/>
     </div>
};

