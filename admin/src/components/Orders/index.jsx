import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import * as React from "react";
import { useEffect } from "react";
import { deleteOrder } from "../../services/deleteOrder";
import { getOrders } from "../../services/getOrders";
import { getUsers } from "../../services/getUsers";
import { updateOrder } from "../../services/updateOrder";

export default function Orders() {
  const url = "http://127.0.0.1:8000/api/orders";
  const [users, setUsers] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const fetchData = async () => {
    const orders = await getOrders();
    const users = await getUsers();

    const rows = orders.map((order) => {
      const user = users.find((user) => user.id === order.userId);

      return {
        id: order.id,
        userEmail: user.email,
        complete: order.complete,
        cartURL: `${url}/${order.id}/cart`,
        addressURL: `${url}/${order.id}/address`,
        customerURL: `${url}/${order.id}/customer`,
      };
    });

    setRows(rows);
    setUsers(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    const target = rows.find((obj) => obj.id === id);

    deleteOrder(target);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    updateOrder(updatedRow);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 300,
    },
    {
      field: "cartURL",
      headerName: "Cart",
      width: 100,
      renderCell: (param) => <a href={param.value}>OPEN</a>,
    },
    {
      field: "addressURL",
      headerName: "Address",
      width: 100,
      renderCell: (param) => <a href={param.value}>OPEN</a>,
    },
    {
      field: "customerURL",
      headerName: "Customer",
      width: 100,
      renderCell: (param) => <a href={param.value}>OPEN</a>,
    },
    {
      field: "userEmail",
      headerName: "User",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: () => users?.map((user) => `${user.email}`),
    },
    {
      field: "complete",
      headerName: "Complete",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: [true, false],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: GridToolbarContainer,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}