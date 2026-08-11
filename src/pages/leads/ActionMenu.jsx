import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ActionMenu = ({
  row,
  handleEdit,
  handleDelete,
  leadStatuses = [],
  onStatusChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 220,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleEdit(row);
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete(row);
          }}
        >
          <ListItemIcon>
            <Delete color="error" fontSize="small" />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <Divider />

        {leadStatuses
          .filter((status) => status.id !== row.leadstatusid)
          .map((status) => (
            <MenuItem
              key={status.id}
              onClick={() => {
                handleClose();
                onStatusChange(row, status);
              }}
            >
              <ListItemText>{status.name}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
