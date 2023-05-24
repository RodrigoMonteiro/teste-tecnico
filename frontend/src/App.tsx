import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Products } from "./model/Products";
import { Table } from "./components/Table";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import BasicModal from "./components/Modal";

interface dataFile {
  product_code: string;
  new_price: number;
}

function App() {
  const baseApiURL = "http://localhost:3000/products";

  const [file, setFile] = useState("");
  const [isValidFile, setIsValidFile] = useState(false);
  const [isAbleUpdateTable, setIsAbleUpdateTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Products>({
    code: 0,
    name: "",
    cost_price: 0,
    sales_price: 0,
  });
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [messageModal, setMessageModal] = useState("");
  const [dataFromFile, setDataFromFile] = useState<dataFile>({
    product_code: "",
    new_price: 0,
  });

  function handleChangeTheme() {
    setIsLightTheme(!isLightTheme);
  }

  async function updateProduct(product: Products) {
    await axios.put(`${baseApiURL}/${product.code}`, product);
    // console.log("Product", product, "updated.");
  }

  const handleValidarArquivoClick = async () => {
    try {
      if (!file) {
        console.error("No file selected.");
        setMessageModal("No file selected.");
        openModal();
        closeModalWithDelay();
        return;
      }

      const response = await axios.get(
        `${baseApiURL}/${dataFromFile.product_code}`
      );
      if (response.status === 200) {
        const product = response.data[0];
        if (!product) {
          setMessageModal("Código do produto não existe.");
          openModal();
          closeModalWithDelay();
          return;
        }
        if (dataFromFile.new_price < product.cost_price) {
          setMessageModal(
            `O novo valor é menor que o preço de compra do produto que foi de  R$ ${product.cost_price}.`
          );
          openModal();
          closeModalWithDelay();
          return;
        }

        const upperLimit = product.sales_price * 1.1;
        const lowerLimit = product.sales_price * 0.9;
        if (
          dataFromFile.new_price > upperLimit ||
          dataFromFile.new_price < lowerLimit
        ) {
          setMessageModal(
            `O novo valor para atualização do produto está inválido. O valor deve estar entre: R$ ${lowerLimit.toFixed(
              2
            )} e R$ ${upperLimit.toFixed(2)}.`
          );
          openModal();
          closeModalWithDelay();
          return;
        }
        setProduct({ ...product, sales_price: dataFromFile.new_price });
        console.log(product)
        setIsAbleUpdateTable(true);
      } else {
        setMessageModal("Um erro aconteceu ao tentar recuperar o produto.");
        return;
      }
    } catch (error) {
      setMessageModal(
        "Estrutura do arquivo inválida. O arquivo deve possuir o código do produto e o novo preço"
      );
    }
  };

  const handleFileInputChange = (event: any) => {
    setIsValidFile(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      if (typeof contents === "string") {
        setFile(file.name);
        const arrayParts = contents.split(",");
        const [part1, part2] = arrayParts;
        setDataFromFile({
          product_code: part1,
          new_price: Number(part2),
        });
      }
    };
    reader.readAsText(file);
  };

  const closeModalWithDelay = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 15000);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <div className="app-container">
        <Header changeTheme={handleChangeTheme} theme={isLightTheme}></Header>
        <div className="selection-container">
          <div className="selection-options-container">
            <div className="selection-options-select-file">
              <h3>1. Selecione o arquivo</h3>
              <div
                className="select-file-content"
                style={{
                  color: "#0f0b0f",
                  backgroundColor: "#faf9fa",
                }}
              >
                {dataFromFile.product_code.length === 0
                  ? "Selecione um arquivo."
                  : file}
              </div>
              <label className="select-file-content-btn" htmlFor="file-input">
                Selecionar arquivo
              </label>
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="selection-options-validar-data">
              <h3>2. Valide os dados</h3>
              <div
                className="select-validar-data"
                style={{
                  color: "#0f0b0f",
                  backgroundColor: "#faf9fa",
                }}
              >
                {dataFromFile.product_code.length === 0
                  ? "Selecione previamente um arquivo, para realizar a validação."
                  : JSON.stringify(dataFromFile)}
              </div>
              <button
                className={
                  isValidFile
                    ? "select-validar-data-btn"
                    : "select-validar-data-btn disabled-button"
                }
                style={{
                  color: isLightTheme ? "#0f0b0f" : "#faf9fa",
                }}
                onClick={handleValidarArquivoClick}
                disabled={!isValidFile}
              >
                Validar arquivo
              </button>
              <BasicModal
                msg={messageModal}
                open={showModal}
                closeWithDelay={closeModalWithDelay}
                close={closeModal}
              />
            </div>

            <div className="selection-options-atualizar-tabela">
              <h3>3. Realize as alterações</h3>
              <button
                className={
                  isAbleUpdateTable
                    ? "selection-options-atualizar-tabela-btn"
                    : "selection-options-atualizar-tabela-btn disabled-button"
                }
                style={{
                  color: isLightTheme ? "#0f0b0f" : "#faf9fa",
                }}
                onClick={() => {
                  updateProduct(product);
                }}
                disabled={!isAbleUpdateTable}
              >
                Atualizar tabela
              </button>
            </div>
          </div>
          <div className="table-data-container">
            <Table theme={isLightTheme}></Table>
          </div>
        </div>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
