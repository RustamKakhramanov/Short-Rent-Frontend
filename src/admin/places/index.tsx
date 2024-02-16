// import { List, Datagrid, DateField, TextField, useRecordContext } from 'react-admin';
// import { useParams } from 'react-router-dom';
// import { Button, Link } from '@mui/material';

// import { Edit } from '@mui/icons-material';

// export const PlaceList = () => {
//     const { id } = useParams();
//     return (
//         <List resource="companies"  filter={{ id: id }}>
//             <Datagrid rowClick="edit">
//                 <TextField source="name" label='Название'/>
//                 <DateField source="created_at" label='Дата создания' />
//                 <EditPlaceButton />
//             </Datagrid>
//         </List>
//     );
// };

// const EditPlaceButton = () => {
//     const song = useRecordContext();
//     return (
//         <Button
//             component={Link}
//             to={`/companies`}
//             startIcon={<Edit />}
//         >
//             Edit
//         </Button>
//     );
// };