import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./styles.css";

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height:250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadious: 5,
  boxShadow: 24,
  p: 4,
  textAlign: 'justify',
  padding: 5
};

export default function BasicModal(props: {
  open: boolean;
  close: () => void;
  closeWithDelay: () => void;
  msg: string;
}) {
  const {msg, open, close, closeWithDelay } = props;
  const handleClose = () => {
    close();
  };
  const handleCloseWithDelay = () => {
    closeWithDelay();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Um erro aconteceu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          <Button style={{alignSelf: 'end'}} onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
