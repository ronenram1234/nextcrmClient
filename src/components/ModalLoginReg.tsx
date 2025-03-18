import { FunctionComponent, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import { GlobalProps } from "../App";
import Register from "./Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";


interface ModalLoginRegProps {
  
}

const ModalLoginReg: FunctionComponent<ModalLoginRegProps> = () => {
  const { isUserLogedin } = useContext(GlobalProps);

  const [isRegister, setIsRegister] = useState(false);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
            },
            "& .MuiInputLabel-root": {
              fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)",
            },
          },
        },
      },
    },
  });
  

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Modal
          show={!isUserLogedin}
          
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {/* {modalAction === "add" ? "Add New Product" : "Update Product"} */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isRegister ? (
              <Register setIsRegister={setIsRegister} />
            ) : (
              <Login setIsRegister={setIsRegister} />
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default ModalLoginReg;
